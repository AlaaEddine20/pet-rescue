import it from "./it-IT.json";

export const labels = it;

// Interpolazione minimale con placeholder nominati: "Ciao, {name}"
export const format = (
  template: string,
  params: Record<string, string | number>,
) => template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? ""));
