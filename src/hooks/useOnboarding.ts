import { useAuthContext } from "@/hooks/useAuthContext";
import {
  completeCitizenOnboarding,
  completeOrganizationOnboarding,
  completeVolunteerOnboarding,
} from "@/services/onboarding";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCompleteOnboarding = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const invalidateProfile = () =>
    queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });

  const citizenMutation = useMutation({
    mutationFn: () => completeCitizenOnboarding(user!.id),
    onSuccess: invalidateProfile,
  });

  const organizationMutation = useMutation({
    mutationFn: (input: { name: string; taxCode: string }) =>
      completeOrganizationOnboarding(user!.id, input),
    onSuccess: invalidateProfile,
  });

  const volunteerMutation = useMutation({
    mutationFn: (organizationId: string) =>
      completeVolunteerOnboarding(user!.id, organizationId),
    onSuccess: invalidateProfile,
  });

  return { citizenMutation, organizationMutation, volunteerMutation };
};
