import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/AuthType";

export const getProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from("users")
    .select("id, user_name, role, avatar_url")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
};
