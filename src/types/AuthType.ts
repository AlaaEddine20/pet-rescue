import { LoginUserSchema, SignUpUserSchema } from "@/lib/validators";
import { z } from "zod";

export type SignUpUser = z.infer<typeof SignUpUserSchema>;
export type LoginUser = z.infer<typeof LoginUserSchema>;

export type Profile = {
  id: string;
  user_name: string;
  role: UserRole | null;
  avatar_url: string | null;
  organization_id: string | null;
};

export type AuthMode = "signin" | "signup";

export const UserRoleSchema = z.enum(["citizen", "organization", "volunteer"]);
export type UserRole = z.infer<typeof UserRoleSchema>;
