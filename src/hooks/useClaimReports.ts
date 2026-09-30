import { useAuthContext } from "@/hooks/useAuthContext";
import { claimReport } from "@/services/report";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useClaimReport = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  return useMutation({
    mutationFn: (reportId: string) => claimReport(reportId, user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports", "relevant"] });
    },
  });
};
