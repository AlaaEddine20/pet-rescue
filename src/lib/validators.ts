import { z } from "zod";

export const SignUpUserSchema = z.object({
  userName: z.string().min(2, { message: "Invalid name" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password confirmation is not correct" }),
});

export const LoginUserSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type LoginUser = z.infer<typeof LoginUserSchema>;
export type SignUpUser = z.infer<typeof SignUpUserSchema>;
