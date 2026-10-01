import { Report } from "@/types/ReportType";
import { Button, ButtonText } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { MapPin, PawPrint } from "lucide-react-native";
import { Text, View } from "react-native";
import { formatRelativeDate } from "../utils/utils";
import ReportStatusBadge from "./ReportStatusBadge";

type ReportListItemProps = {
  report: Report;
  onClaim?: (reportId: string) => void;
  isClaiming?: boolean;
};

const ReportListItem = ({
  report,
  onClaim,
  isClaiming,
}: ReportListItemProps) => {
  const canClaim = report.status === "pending" && !!onClaim;

  return (
    <View className="flex-row items-center gap-3 rounded-xl bg-secondary p-3">
      <View className="h-10 w-10 items-center justify-center rounded-lg bg-accent">
        <Icon as={PawPrint} size="sm" className="text-accent-foreground" />
      </View>

      <View className="flex-1">
        <Text
          className="font-pet-medium text-sm text-foreground"
          numberOfLines={1}
        >
          {report.title}
        </Text>
        <View className="mt-0.5 flex-row items-center gap-1">
          {report.addressLabel && (
            <>
              <Icon as={MapPin} size="xs" className="text-muted-foreground" />
              <Text className="text-xs text-muted-foreground" numberOfLines={1}>
                {report.addressLabel}
              </Text>
              <Text className="text-xs text-muted-foreground">·</Text>
            </>
          )}
          <Text className="text-xs text-muted-foreground">
            {formatRelativeDate(report.createdAt)}
          </Text>
        </View>
      </View>

      {canClaim ? (
        <Button
          className="rounded-lg border border-primary bg-transparent px-3 py-1.5"
          onPress={() => onClaim!(report.id)}
          disabled={isClaiming}
          accessibilityLabel={`Prendi in carico: ${report.title}`}
        >
          <ButtonText className="font-pet-medium text-xs text-primary">
            {isClaiming ? "..." : "Prendi in carico"}
          </ButtonText>
        </Button>
      ) : (
        <ReportStatusBadge status={report.status} />
      )}
    </View>
  );
};

export default ReportListItem;
