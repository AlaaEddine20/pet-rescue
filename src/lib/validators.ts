import { z } from "zod";

export const newUserSchema = z.object({
  name: z.string().min(1, { error: "Invalid name" }),
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" }),
  confirmPassword: z
    .string()
    .min(8, { error: "Confirm Password is not correct" }),
});

export const registeredUserSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" }),
});

export type NewUser = z.infer<typeof newUserSchema>;
export type RegisteredUser = z.infer<typeof registeredUserSchema>;
