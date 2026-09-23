import { z } from "zod";

export const SignUpUserSchema = z
  .object({
    user_name: z.string().min(2, { message: "Invalid name" }),
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password confirmation is not correct" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginUserSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const NewReportSchema = z.object({
  animalType: z.enum(["dog", "cat", "other"]),
  description: z.string().min(10, {
    message: "Aggiungi qualche dettaglio in più (almeno 10 caratteri).",
  }),
});

export type NewReportFormValues = z.infer<typeof NewReportSchema>;
