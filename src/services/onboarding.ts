import { supabase } from "@/lib/supabase";

export const completeCitizenOnboarding = async (userId: string) => {
  const { error } = await supabase
    .from("users")
    .update({ role: "citizen" })
    .eq("id", userId);
  if (error) throw error;
};

export const completeOrganizationOnboarding = async (
  userId: string,
  input: { name: string; taxCode: string },
) => {
  const { data: org, error: orgError } = await supabase
    .from("organizations")
    .insert({ name: input.name, tax_code: input.taxCode, created_by: userId })
    .select("id")
    .single();
  if (orgError) throw orgError;

  const { error: userError } = await supabase
    .from("users")
    .update({ role: "organization", organization_id: org.id })
    .eq("id", userId);
  if (userError) throw userError;
};

export const completeVolunteerOnboarding = async (
  userId: string,
  organizationId: string,
) => {
  const { error } = await supabase
    .from("users")
    .update({ role: "volunteer", organization_id: organizationId })
    .eq("id", userId);
  if (error) throw error;
};

export const getOrganizations = async (): Promise<
  { id: string; name: string }[]
> => {
  const { data, error } = await supabase
    .from("organizations")
    .select("id, name")
    .order("name");
  if (error) throw error;
  return data;
};
