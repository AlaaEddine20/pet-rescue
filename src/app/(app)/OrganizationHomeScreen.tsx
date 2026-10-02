import AppHeader from "@/components/AppHeader";
import { FilterChips } from "@/components/FilterChips";
import { MetricCard } from "@/components/MetricCard";
import MyReportsList from "@/components/ReportList";
import { ScreenGreeting } from "@/components/ScreenGreeting";
import { useClaimReport } from "@/hooks/useClaimReports";
import { useOrganizationReports } from "@/hooks/useOrganizationReports";
import { AnimalType } from "@/types/ReportType";
import { useMemo, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";

type AnimalFilter = "all" | AnimalType;

export default function OrganizationScreen() {
  const { data: reports, isLoading } = useOrganizationReports();
  const {
    mutate: claim,
    isPending: isClaiming,
    variables: claimingReportId,
  } = useClaimReport();
  const [filter, setFilter] = useState<AnimalFilter>("all");

  const filteredReports = useMemo(() => {
    if (!reports) return [];
    if (filter === "all") return reports;
    return reports.filter((r) => r.animalType === filter);
  }, [reports, filter]);

  const pendingCount = useMemo(
    () => reports?.filter((r) => r.status === "pending").length ?? 0,
    [reports],
  );
  const inProgressCount = useMemo(
    () => reports?.filter((r) => r.status === "in_progress").length ?? 0,
    [reports],
  );

  console.log(pendingCount);
  console.log(inProgressCount);

  const handleClaim = (reportId: string) => {
    claim(reportId, {
      onError: (error) => Alert.alert("Non riuscito", error.message),
    });
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ padding: 20, gap: 16 }}
    >
      <AppHeader onNotificationsPress={() => {}} />
      <ScreenGreeting title="Segnalazioni da gestire" />

      <View className="flex-row gap-2.5">
        <MetricCard label="Nuove" value={pendingCount} variant="accent" />
        <MetricCard label="In carico" value={inProgressCount} />
      </View>

      <FilterChips
        value={filter}
        onChange={setFilter}
        options={[
          { label: "Tutte", value: "all" },
          { label: "Cani", value: "dog" },
          { label: "Gatti", value: "cat" },
        ]}
      />

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <MyReportsList
          reports={filteredReports}
          onClaim={handleClaim}
          claimingReportId={isClaiming ? claimingReportId : undefined}
        />
      )}
    </ScrollView>
  );
}
