import z from "zod";

export type NewReport = {
  animalType: AnimalType;
  description: string;
  photo: { uri: string; base64: string };
  latitude: number;
  longitude: number;
  addressLabel?: string | null;
};

export const AnimalTypeSchema = z.enum(["dog", "cat", "other"]);
export type AnimalType = z.infer<typeof AnimalTypeSchema>;

export const ReportStatusSchema = z.enum(["pending", "in_progress", "rescued"]);
export type ReportStatus = z.infer<typeof ReportStatusSchema>;

export type Report = {
  id: string;
  title: string;
  animalType: AnimalType;
  createdAt: string;
  status: ReportStatus;
  addressLabel: string | null;
};

export const UserRoleSchema = z.enum(["citizen", "organization", "volunteer"]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export type Profile = {
  id: string;
  user_name: string;
  role: UserRole | null; // null = onboarding non completato
  avatar_url: string | null;
  organization_id: string | null;
};