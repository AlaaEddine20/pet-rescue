import { Report } from "@/types/ReportType";
import { PawPrint } from "lucide-react-native";
import { Text, View } from "react-native";
import { formatRelativeDate } from "../utils/utils";
import ReportStatusBadge from "./ReportStatusBadge";

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
