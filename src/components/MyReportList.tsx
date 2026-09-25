import { Report } from "@/types/ReportType";
import { FlatList, Text, View } from "react-native";
import ReportListItem from "./ReportListItem";

type MyReportsListProps = {
  reports: Report[];
};

const MyReportsList = ({ reports }: MyReportsListProps) => {
  if (reports.length === 0) {
    return (
      <View className="items-center rounded-xl bg-secondary p-6">
        <Text className="font-pet-medium text-sm text-foreground">
          Nessuna segnalazione ancora
        </Text>
        <Text className="mt-1 text-center text-xs text-muted-foreground">
          Le segnalazioni che invii appariranno qui.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reports}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReportListItem report={item} />}
      ItemSeparatorComponent={() => <View className="h-2.5" />}
      scrollEnabled={false} // lo scroll è gestito dalla ScrollView della screen
    />
  );
};

export default MyReportsList;
