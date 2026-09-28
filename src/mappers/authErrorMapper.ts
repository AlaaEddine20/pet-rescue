import { labels } from "@/locales";
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
        message: labels.authErrors.emailAlreadyExists,
      });
      return;

    case "email_address_invalid":
      setError("email" as Path<T>, {
        type: "manual",
        message: labels.authErrors.emailAddressInvalid,
      });
      return;

    // --- riguarda specificamente l'email (solo signIn) ---
    case "email_not_confirmed":
      setError("email" as Path<T>, {
        type: "manual",
        message: labels.authErrors.emailNotConfirmed,
      });
      return;

    // --- riguarda specificamente la password (solo signUp) ---
    case "weak_password":
      setError("password" as Path<T>, {
        type: "manual",
        message: labels.authErrors.weakPassword,
      });
      return;

    // --- ambiguo per design (solo signIn): mai specificare quale dei due è sbagliato ---
    case "invalid_credentials":
      setError("root", {
        type: "manual",
        message: labels.authErrors.invalidCredentials,
      });
      return;

    // --- non riguardano nessun campo, comuni a entrambi i flussi ---
    case "over_request_rate_limit":
    case "over_email_send_rate_limit":
      setError("root", {
        type: "manual",
        message: labels.authErrors.tooManyAttempts,
      });
      return;

    case "user_banned":
      setError("root", {
        type: "manual",
        message: labels.authErrors.userBanned,
      });
      return;

    case "signup_disabled":
    case "email_provider_disabled":
      setError("root", {
        type: "manual",
        message: labels.authErrors.signupDisabled,
      });
      return;

    default:
      // Errori di rete non hanno un "code" — si riconoscono dal name
      if (error.name === "AuthRetryableFetchError") {
        setError("root", {
          type: "manual",
          message: labels.authErrors.networkError,
        });
        return;
      }

      setError("root", {
        type: "manual",
        message: labels.authErrors.genericError,
      });
  }
}
