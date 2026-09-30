import { useMyReports } from "@/hooks/useReports";
import { labels } from "@/locales";
import { Report } from "@/types/ReportType";
import { FlatList, Text, View } from "react-native";
import ReportListItem from "./MyReportListItem";

type MyReportsListProps = {
  reports: Report[];
};

const MyReportsList = ({ reports }: MyReportsListProps) => {
  const { isError } = useMyReports();

  if (reports.length === 0 || isError) {
    return (
      <View className="items-center rounded-xl bg-secondary p-6">
        <Text className="font-pet-medium text-sm text-foreground">
          {labels.myReportsList.empty.title}
        </Text>
        <Text className="mt-1 text-center text-xs text-muted-foreground">
          {labels.myReportsList.empty.body}
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
