import { labels } from "@/locales";
import { z } from "zod";

export const SignUpUserSchema = z
  .object({
    user_name: z.string().min(2, { message: labels.validation.invalidName }),
    email: z.email({ message: labels.validation.invalidEmail }),
    password: z
      .string()
      .min(8, { message: labels.validation.passwordTooShort }),
    confirmPassword: z.string().min(8, {
      message: labels.validation.passwordConfirmationNotCorrect,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: labels.validation.passwordsDoNotMatch,
    path: ["confirmPassword"],
  });

export const LoginUserSchema = z.object({
  email: z.email({ message: labels.validation.invalidEmail }),
  password: z.string().min(8, { message: labels.validation.passwordTooShort }),
});

export const NewReportSchema = z.object({
  animalType: z.enum(["dog", "cat", "other"]),
  description: z.string().min(10, {
    message: labels.validation.reportDescriptionTooShort,
  }),
});

export type NewReportFormValues = z.infer<typeof NewReportSchema>;

const CODICE_FISCALE_REGEX = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;
const PARTITA_IVA_REGEX = /^\d{11}$/;

export const OrganizationOnboardingSchema = z.object({
  name: z.string().min(2, { message: labels.validation.organizationNameRequired }),
  taxCode: z
    .string()
    .toUpperCase()
    .refine(
      (value) =>
        CODICE_FISCALE_REGEX.test(value) || PARTITA_IVA_REGEX.test(value),
      { message: labels.validation.organizationTaxCodeInvalid },
    ),
});
export type OrganizationOnboardingValues = z.infer<
  typeof OrganizationOnboardingSchema
>;
