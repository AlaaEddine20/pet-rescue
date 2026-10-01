import { useAuthContext } from "@/hooks/useAuthContext";
import { getMyReports } from "@/services/report";
import { useQuery } from "@tanstack/react-query";

export function useMyReports() {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: ["reports", "mine", user?.id],
    queryFn: () => getMyReports(user!.id),
    enabled: !!user,
  });
}
