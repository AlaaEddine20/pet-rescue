import * as cheerio from "npm:cheerio@1.2.0";
import makeFetchCookie from "npm:fetch-cookie@3.2.0";
import { CookieJar } from "npm:tough-cookie@6.0.2";
import * as XLSX from "npm:xlsx@0.18.5";

const LIST_URL =
  "https://servizi.lavoro.gov.it/runts/it-it/Lista-enti";

const DOWNLOAD_URL =
  "https://servizi.lavoro.gov.it/Runts/DocumentoEnte.aspx";

export default {
  fetch: async () => {
    try {
      const jar = new CookieJar();
      const fetchWithCookies = makeFetchCookie(fetch, jar);

      // 1. Open RUNTS page and create ASP.NET session
      const pageResponse = await fetchWithCookies(LIST_URL);

      if (!pageResponse.ok) {
        throw new Error(`RUNTS page failed: ${pageResponse.status}`);
      }

      const html = await pageResponse.text();
      const $ = cheerio.load(html);

      const viewState = $('input[name="__VIEWSTATE"]').val();
      const eventValidation = $('input[name="__EVENTVALIDATION"]').val();
      const viewStateGenerator = $(
        'input[name="__VIEWSTATEGENERATOR"]',
      ).val();

      if (!viewState || !eventValidation) {
        throw new Error("RUNTS ASP.NET state not found");
      }

      // 2. Simulate click on "Enti iscritti (formato Excel)"
      const buttonName =
        "dnn$ctr428$View$gvEnti$ctl09$btnScaricaDoc";

      const form = new URLSearchParams();

      form.set(
        "ScriptManager",
        `dnn$ctr428$View$upRicercaAssociazioni|${buttonName}`,
      );

      form.set("__EVENTTARGET", "");
      form.set("__EVENTARGUMENT", "");
      form.set("__VIEWSTATE", String(viewState));

      if (viewStateGenerator) {
        form.set(
          "__VIEWSTATEGENERATOR",
          String(viewStateGenerator),
        );
      }

      form.set("__VIEWSTATEENCRYPTED", "");
      form.set("__EVENTVALIDATION", String(eventValidation));
      form.set("ScrollTop", "");
      form.set("__dnnVariable", "");
      form.set("__ASYNCPOST", "true");
      form.set(buttonName, "Scarica");

      const postResponse = await fetchWithCookies(LIST_URL, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded; charset=UTF-8",
          "X-MicrosoftAjax": "Delta=true",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: form,
      });

      if (!postResponse.ok) {
        throw new Error(
          `RUNTS document selection failed: ${postResponse.status}`,
        );
      }

      await postResponse.text();

      // 3. Download XLSX using the same ASP.NET session
      const fileResponse =
        await fetchWithCookies(DOWNLOAD_URL);

      if (!fileResponse.ok) {
        throw new Error(
          `RUNTS download failed: ${fileResponse.status}`,
        );
      }

      const disposition =
        fileResponse.headers.get("content-disposition");

      if (!disposition?.includes(".xlsx")) {
        throw new Error(
          `Expected XLSX, received: ${disposition}`,
        );
      }

      // 4. Parse Excel
      const buffer = await fileResponse.arrayBuffer();

      const workbook = XLSX.read(buffer, {
        type: "array",
      });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const rows = XLSX.utils.sheet_to_json<unknown[]>(
        worksheet,
        {
          header: 1,
          defval: null,
        },
      );

      return Response.json({
        success: true,
        file: disposition,
        rows: rows.length,
        headers: rows[0],
      });
    } catch (error) {
      console.error(error);

      return Response.json(
        {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : String(error),
        },
        { status: 500 },
      );
    }
  },
};