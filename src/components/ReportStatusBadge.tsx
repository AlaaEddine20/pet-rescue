import { labels } from "@/locales";
import { ReportStatus } from "@/types/ReportType";
import { Text, View } from "react-native";

const STATUS_CONFIG: Record<
  ReportStatus,
  { label: string; bg: string; text: string }
> = {
  pending: {
    label: labels.reportStatusBadge.status.pending,
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  in_progress: {
    label: labels.reportStatusBadge.status.inProgress,
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  rescued: {
    label: labels.reportStatusBadge.status.rescued,
    bg: "bg-green-50",
    text: "text-green-700",
  },
};

type ReportStatusBadgeProps = {
  status: ReportStatus;
};

const ReportStatusBadge = ({ status }: ReportStatusBadgeProps) => {
  const { label, bg, text } = STATUS_CONFIG[status];

  return (
    <View className={`rounded-md px-2.5 py-1 ${bg}`}>
      <Text className={`font-pet-medium text-xs ${text}`}>{label}</Text>
    </View>
  );
};

export default ReportStatusBadge;
