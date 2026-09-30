import { useAuthContext } from "@/hooks/useAuthContext";
import { getMyReports, getRelevantReports } from "@/services/report";
import { useQuery } from "@tanstack/react-query";

export function useMyReports() {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: ["reports", "mine", user?.id],
    queryFn: () => getMyReports(user!.id),
    enabled: !!user,
  });
}

export const useOrganizationReports = () => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: ["reports", "relevant", user?.id],
    queryFn: () => getRelevantReports(user!.id),
    enabled: !!user,
  });
};
