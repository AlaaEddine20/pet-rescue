import { useAuthContext } from "@/hooks/useAuthContext";
import type { OrganizationOnboardingValues } from "@/lib/validators";
import {
  completeCitizenOnboarding,
  completeOrganizationOnboarding,
  completeVolunteerOnboarding,
} from "@/services/onboarding";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCompleteOnboarding = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const userId = user!.id;

  const invalidateProfile = () =>
    queryClient.invalidateQueries({
      queryKey: ["profile", userId],
      exact: true,
    });

  const citizenMutation = useMutation({
    mutationFn: () => completeCitizenOnboarding(userId),
    onSuccess: invalidateProfile,
  });

  const organizationMutation = useMutation({
    mutationFn: (input: OrganizationOnboardingValues) =>
      completeOrganizationOnboarding(userId, input),
    onSuccess: invalidateProfile,
  });

  const volunteerMutation = useMutation({
    mutationFn: (organizationId: string | null) =>
      completeVolunteerOnboarding(userId, organizationId),
    onSuccess: invalidateProfile,
  });

  return { citizenMutation, organizationMutation, volunteerMutation };
};
