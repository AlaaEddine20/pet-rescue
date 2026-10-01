import { createClient } from "@supabase/supabase-js";
import * as cheerio from "cheerio";
import "dotenv/config";
import makeFetchCookie from "fetch-cookie";
import fs from "node:fs/promises";
import { CookieJar } from "tough-cookie";
import * as XLSX from "xlsx";

const BASE_URL =
    "https://servizi.lavoro.gov.it/runts/it-it/Lista-enti";

const DOWNLOAD_URL =
    "https://servizi.lavoro.gov.it/Runts/DocumentoEnte.aspx";

const jar = new CookieJar();
const fetchWithCookies = makeFetchCookie(fetch, jar);

const normalizeDate = (value) => {
    if (!value) return null;

    if (value instanceof Date) {
        return value.toISOString().slice(0, 10);
    }

    const stringValue = String(value).trim();

    const match = stringValue.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

    if (match) {
        const [, day, month, year] = match;
        return `${year}-${month}-${day}`;
    }

    return null;
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(
    supabaseUrl,
    supabaseSecretKey,
    {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false,
        },
    },
);

async function downloadRuntsExcel() {
    // 1. Open RUNTS page and create ASP.NET session
    const pageResponse = await fetchWithCookies(BASE_URL);

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

    // 2. Select "Enti iscritti (formato Excel)"
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

    const postResponse = await fetchWithCookies(BASE_URL, {
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
            `RUNTS POST failed: ${postResponse.status}`,
        );
    }

    await postResponse.text();

    // 3. Download XLSX
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
            `Expected XLSX file, received: ${disposition}`,
        );
    }

    console.log("Downloaded:", disposition);

    const buffer = Buffer.from(
        await fileResponse.arrayBuffer(),
    );

    await fs.writeFile("runts-iscritti.xlsx", buffer);

    // 4. Parse XLSX
    const workbook = XLSX.read(buffer, {
        type: "buffer",
        cellDates: true,
    });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: null,
        raw: true,
    });

    // First row contains column headers
    const dataRows = rows.slice(1);

    const entities = dataRows
        .map((row) => ({
            tax_code: row[0]
                ? String(row[0]).trim()
                : null,

            repertory_number: row[1]
                ? String(row[1]).trim()
                : null,

            name: row[2]
                ? String(row[2]).trim()
                : null,

            runts_section: row[3]
                ? String(row[3]).trim()
                : null,

            legal_representative: row[4]
                ? String(row[4]).trim()
                : null,

            municipality: row[6]
                ? String(row[6]).trim()
                : null,

            province: row[7]
                ? String(row[7]).trim()
                : null,

            registration_date: normalizeDate(row[9]),
        }))
        .filter(
            (entity) =>
                entity.tax_code && entity.name,
        );

    console.log(
        `Parsed ${entities.length} RUNTS entities`,
    );

    console.log("First entity:", entities[0]);

    const BATCH_SIZE = 500;

    for (let i = 0; i < entities.length; i += BATCH_SIZE) {
        const batch = entities.slice(i, i + BATCH_SIZE);

        const { error } = await supabase
            .from("runts_entities")
            .upsert(batch, {
                onConflict: "tax_code",
            });

        if (error) {
            throw error;
        }

        console.log(
            `Synced ${Math.min(i + BATCH_SIZE, entities.length)}/${entities.length}`,
        );
    }

    // Temporary output to inspect parsed data
    await fs.writeFile(
        "runts-entities.json",
        JSON.stringify(entities, null, 2),
    );
}

downloadRuntsExcel().catch((error) => {
    console.error(error);
    process.exit(1);
});