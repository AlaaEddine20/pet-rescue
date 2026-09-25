export type ReportStatus = "pending" | "in_progress" | "rescued";

export type Report = {
  id: string;
  title: string;
  createdAt: string; // ISO date string
  status: ReportStatus;
};

export type AnimalType = "dog" | "cat" | "other";

export type NewReport = {
  reporter_id: string;
  animalType: AnimalType;
  description: string;
  photo: { uri: string; base64: string };
  latitude: number;
  longitude: number;
  addressLabel?: string | null;
};
