import { z } from "zod";

export const newUserSchema = z.object({
  name: z.string().min(2, { message: "Invalid name" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password confirmation is not correct" }),
});

export const registeredUserSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type NewUser = z.infer<typeof newUserSchema>;
export type RegisteredUser = z.infer<typeof registeredUserSchema>;
