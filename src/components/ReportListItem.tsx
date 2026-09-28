import { format, labels } from "@/locales";
import { Report } from "@/types/ReportType";
import { PawPrint } from "lucide-react-native";
import { Text, View } from "react-native";
import ReportStatusBadge from "./ReportStatusBadge";

function formatRelativeDate(isoDate: string): string {
  const diffDays = Math.floor(
    (Date.now() - new Date(isoDate).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return labels.reportListItem.relative.today;
  if (diffDays === 1) return labels.reportListItem.relative.yesterday;
  return format(labels.reportListItem.relative.daysAgo, { days: diffDays });
}

type ReportListItemProps = {
  report: Report;
};

const ReportListItem = ({ report }: ReportListItemProps) => {
  return (
    <View className="flex-row items-center gap-3 rounded-xl bg-secondary p-3">
      <View className="h-10 w-10 items-center justify-center rounded-lg bg-accent">
        <PawPrint size={17} color="#2E86DE" />
      </View>

      <View className="flex-1">
        <Text
          className="font-pet-medium text-sm text-foreground"
          numberOfLines={1}
        >
          {report.title}
        </Text>
        <Text className="mt-0.5 text-xs text-muted-foreground">
          {formatRelativeDate(report.createdAt)}
        </Text>
      </View>

      <ReportStatusBadge status={report.status} />
    </View>
  );
};

export default ReportListItem;
