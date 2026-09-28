import { labels } from "@/locales";
import { z } from "zod";

export const SignUpUserSchema = z
  .object({
    user_name: z.string().min(2, { message: labels.validation.invalidName }),
    email: z.email({ message: labels.validation.invalidEmail }),
    password: z
      .string()
      .min(8, { message: labels.validation.passwordTooShort }),
    confirmPassword: z
      .string()
      .min(8, {
        message: labels.validation.passwordConfirmationNotCorrect,
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: labels.validation.passwordsDoNotMatch,
    path: ["confirmPassword"],
  });

export const LoginUserSchema = z.object({
  email: z.email({ message: labels.validation.invalidEmail }),
  password: z
    .string()
    .min(8, { message: labels.validation.passwordTooShort }),
});

export const NewReportSchema = z.object({
  animalType: z.enum(["dog", "cat", "other"]),
  description: z.string().min(10, {
    message: labels.validation.reportDescriptionTooShort,
  }),
});

export type NewReportFormValues = z.infer<typeof NewReportSchema>;
