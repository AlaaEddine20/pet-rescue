import { getRuntsEntityByTaxCode } from "@/services/runts";
import { useQuery } from "@tanstack/react-query";

export const useRuntsEntityByTaxCode = (taxCode: string) => {
  const normalizedTaxCode = taxCode.trim();

  return useQuery({
    queryKey: ["runts-entity", normalizedTaxCode],
    queryFn: () => getRuntsEntityByTaxCode(normalizedTaxCode),
    enabled: !!normalizedTaxCode,
  });
};
