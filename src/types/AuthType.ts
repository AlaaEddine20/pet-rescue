import { LoginUserSchema, SignUpUserSchema } from "@/lib/validators";
import z from "zod";

export type SignUpUser = z.infer<typeof SignUpUserSchema>;
export type LoginUser = z.infer<typeof LoginUserSchema>;

export type Profile = {
  id: string;
  user_name: string;
  role: string;
  avatar_url: string;
};

export type AuthMode = "signin" | "signup";
