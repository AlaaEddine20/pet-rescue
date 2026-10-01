import { getRelevantReports } from "@/services/report";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";

export const useOrganizationReports = () => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: ["reports", "relevant", user?.id],
    queryFn: () => getRelevantReports(user!.id),
    enabled: !!user,
  });
};
