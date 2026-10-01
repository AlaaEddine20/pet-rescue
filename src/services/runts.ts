import { supabase } from "@/lib/supabase";
import type { RuntsEntity } from "@/types/RuntsEntityType";

export const getRuntsEntityByTaxCode = async (
  taxCode: string,
): Promise<RuntsEntity | null> => {
  const { data, error } = await supabase
    .from("runts_entities")
    .select(
      `
      tax_code,
      repertory_number,
      name,
      runts_section,
      legal_representative,
      municipality,
      province,
      registration_date
      `,
    )
    .eq("tax_code", taxCode.trim())
    .maybeSingle();

  if (error) throw error;

  return data;
};
