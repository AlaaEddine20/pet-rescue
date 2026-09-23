export type ReportStatus = "pending" | "in_progress" | "rescued";

export type Report = {
  id: string;
  title: string;
  createdAt: string; // ISO date string
  status: ReportStatus;
};
