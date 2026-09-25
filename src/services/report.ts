import { supabase } from "@/lib/supabase";
import { NewReport } from "@/types/Report";
import { decode } from "base64-arraybuffer";

async function uploadReportPhoto(userId: string, photo: NewReport["photo"]) {
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
}

export async function createReport(reporterId: string, report: NewReport) {
  const photoUrl = await uploadReportPhoto(reporterId, report.photo);

  const { error } = await supabase.from("reports").insert({
    reporter_id: reporterId,
    animal_type: report.animalType,
    description: report.description,
    photo_url: photoUrl,
    latitude: report.latitude,
    longitude: report.longitude,
    address_label: report.addressLabel ?? null,
  });

  if (error) throw error;
}
