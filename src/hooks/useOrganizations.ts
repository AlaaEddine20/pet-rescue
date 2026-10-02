import { getOrganizations } from "@/services/onboarding";
import { useQuery } from "@tanstack/react-query";

// hooks/useOrganizations.ts
export const useOrganizations = () =>
  useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });
