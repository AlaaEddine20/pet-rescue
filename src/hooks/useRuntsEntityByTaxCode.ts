import { getRuntsEntityByTaxCode } from "@/services/runts";
import { useQuery } from "@tanstack/react-query";

export const useRuntsEntityByTaxCode = (taxCode: string, enabled = true) => {
  const normalizedTaxCode = taxCode.trim().toUpperCase();

  return useQuery({
    queryKey: ["runts-entity", normalizedTaxCode],
    queryFn: () => getRuntsEntityByTaxCode(normalizedTaxCode),
    enabled: !!normalizedTaxCode && enabled,
  });
};
