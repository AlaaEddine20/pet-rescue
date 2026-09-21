import type { AuthError } from "@supabase/supabase-js";
import type { Path, UseFormSetError } from "react-hook-form";

// Vincolo minimo: la funzione lavora con qualunque form che abbia
// almeno email e password come campi — sia LoginUser che SignUpUser lo soddisfano
type AuthFormFields = {
  email: string;
  password: string;
};

export function applyAuthError<T extends AuthFormFields>(
  error: AuthError,
  setError: UseFormSetError<T>,
) {
  switch (error.code) {
    // --- riguarda specificamente l'email (solo signUp) ---
    case "user_already_exists":
    case "email_exists":
      setError("email" as Path<T>, {
        type: "manual",
        message: "Esiste già un account con questa email.",
      });
      return;

    case "email_address_invalid":
      setError("email" as Path<T>, {
        type: "manual",
        message: "Questo indirizzo email non è supportato.",
      });
      return;

    // --- riguarda specificamente l'email (solo signIn) ---
    case "email_not_confirmed":
      setError("email" as Path<T>, {
        type: "manual",
        message: "Conferma la tua email prima di accedere.",
      });
      return;

    // --- riguarda specificamente la password (solo signUp) ---
    case "weak_password":
      setError("password" as Path<T>, {
        type: "manual",
        message: "La password non è sufficientemente sicura.",
      });
      return;

    // --- ambiguo per design (solo signIn): mai specificare quale dei due è sbagliato ---
    case "invalid_credentials":
      setError("root", {
        type: "manual",
        message: "Email o password non corretti.",
      });
      return;

    // --- non riguardano nessun campo, comuni a entrambi i flussi ---
    case "over_request_rate_limit":
    case "over_email_send_rate_limit":
      setError("root", {
        type: "manual",
        message: "Troppi tentativi. Riprova tra qualche minuto.",
      });
      return;

    case "user_banned":
      setError("root", {
        type: "manual",
        message: "Questo account è stato temporaneamente sospeso.",
      });
      return;

    case "signup_disabled":
    case "email_provider_disabled":
      setError("root", {
        type: "manual",
        message: "La registrazione non è al momento disponibile.",
      });
      return;

    default:
      // Errori di rete non hanno un "code" — si riconoscono dal name
      if (error.name === "AuthRetryableFetchError") {
        setError("root", {
          type: "manual",
          message: "Problema di connessione. Controlla la rete e riprova.",
        });
        return;
      }

      setError("root", {
        type: "manual",
        message: "Si è verificato un errore. Riprova più tardi.",
      });
  }
}
