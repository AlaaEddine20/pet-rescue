import { AuthError } from "@supabase/supabase-js";

export function mapAuthError(error: AuthError | null): string {
  if (!error) return "";

  switch (error.message) {
    case "Invalid login credentials":
      return "Email o password non corretti.";
    case "User already registered":
      return "Esiste già un account con questa email.";
    case "Email not confirmed":
      return "Conferma la tua email prima di accedere.";
    default:
      // Errori di rete o non previsti: messaggio generico, mai il raw message
      if (error.message.includes("Network")) {
        return "Problema di connessione. Riprova.";
      }
      return "Si è verificato un errore. Riprova più tardi.";
  }
}
