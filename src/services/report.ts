import { useAuthContext } from "@/hooks/useAuthContext";
import { supabase } from "@/lib/supabase";
import {
  AnimalTypeSchema,
  NewReport,
  Report,
  ReportStatusSchema,
} from "@/types/ReportType";
import { decode } from "base64-arraybuffer";
import z from "zod";

export const uploadReportPhoto = async (
  userId: string,
  photo: NewReport["photo"],
) => {
  const fileExt = photo.uri.split(".").pop()?.toLowerCase() ?? "jpg";
  const filePath = `${userId}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("report-photos")
    .upload(filePath, decode(photo.base64), {
      contentType: `image/${fileExt}`,
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("report-photos")
    .getPublicUrl(filePath);
  return data.publicUrl;
};

export const createReport = async (reporterId: string, report: NewReport) => {
  const photoUrl = await uploadReportPhoto(reporterId, report.photo);
  const { user } = useAuthContext();
  const { error } = await supabase.from("reports").insert({
    reporter_id: user?.id,
    animal_type: report.animalType,
    description: report.description,
    photo_url: photoUrl,
    latitude: report.latitude,
    longitude: report.longitude,
    address_label: report.addressLabel ?? null,
  });

  if (error) throw error;
};

const ReportRowSchema = z.object({
  id: z.string(),
  description: z.string(),
  animal_type: AnimalTypeSchema,
  status: ReportStatusSchema,
  created_at: z.string(),
  address_label: z.string().nullable(),
});

const mapRowToReport = (row: unknown): Report => {
  const parsed = ReportRowSchema.parse(row);
  return {
    id: parsed.id,
    title: parsed.description,
    animalType: parsed.animal_type,
    createdAt: parsed.created_at,
    status: parsed.status,
    addressLabel: parsed.address_label,
  };
};

export const getMyReports = async (reporterId: string): Promise<Report[]> => {
  const { data, error } = await supabase
    .from("reports")
    .select("id, description, status, created_at")
    .eq("reporter_id", reporterId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map(mapRowToReport);
};

export const getRelevantReports = async (
  responderId: string,
): Promise<Report[]> => {
  const { data, error } = await supabase
    .from("reports")
    .select("id, description, animal_type, status, created_at, address_label")
    .or(`status.eq.pending,assigned_to.eq.${responderId}`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data.map(mapRowToReport);
};

export const claimReport = async (
  reportId: string,
  responderId: string,
): Promise<void> => {
  const { error, data } = await supabase
    .from("reports")
    .update({ status: "in_progress", assigned_to: responderId })
    .eq("id", reportId)
    .eq("status", "pending")
    .select()
    .maybeSingle();

  if (error) throw error;
  if (!data) {
    throw new Error(
      "Questa segnalazione è già stata presa in carico da qualcun altro.",
    );
  }
};
