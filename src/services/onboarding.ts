import { supabase } from "@/lib/supabase";
import type { OrganizationOnboardingValues } from "@/lib/validators";
import { OrganizationOnboardingSchema } from "@/lib/validators";
import { labels } from "@/locales";
import type { UserRole } from "@/types/AuthType";

const updateOnboardingProfile = async (
  userId: string,
  updates: { role: UserRole; organization_id?: string | null },
) => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId)
    .select("id")
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error(labels.onboarding.errors.profileUpdateFailed);
};

export const completeCitizenOnboarding = async (userId: string) => {
  await updateOnboardingProfile(userId, { role: "citizen" });
};

export const completeOrganizationOnboarding = async (
  userId: string,
  input: OrganizationOnboardingValues,
) => {
  const { name, taxCode } = OrganizationOnboardingSchema.parse(input);
  const { data: org, error: orgError } = await supabase
    .from("organizations")
    .insert({
      name,
      tax_code: taxCode,
      created_by: userId,
      verification_status: "pending",
    })
    .select("id")
    .single();
  if (orgError) throw orgError;

  await updateOnboardingProfile(userId, {
    role: "organization",
    organization_id: org.id,
  });
};

export const completeVolunteerOnboarding = async (
  userId: string,
  organizationId: string | null,
) => {
  if (organizationId !== null) {
    const { data, error } = await supabase
      .from("organizations")
      .select("id")
      .eq("id", organizationId)
      .eq("verification_status", "verified")
      .maybeSingle();
    if (error) throw error;
    if (!data)
      throw new Error(
        labels.onboarding.volunteer.errors.organizationIneligible,
      );
  }

  await updateOnboardingProfile(userId, {
    role: "volunteer",
    organization_id: organizationId,
  });
};

export const getOrganizations = async (): Promise<
  { id: string; name: string }[]
> => {
  const { data, error } = await supabase
    .from("organizations")
    .select("id, name")
    .eq("verification_status", "verified")
    .order("name");
  if (error) throw error;
  return data;
};
