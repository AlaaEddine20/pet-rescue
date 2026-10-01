import AppHeader from "@/components/AppHeader";
import ReportCtaCard from "@/components/ReportCtaCard";
import MyReportsList from "@/components/ReportList";
import ScreenContainer from "@/components/ScreenContainer";
import { ScreenGreeting } from "@/components/ScreenGreeting";
import { useMyReports } from "@/hooks/useReports";
import { labels } from "@/locales";
import { useRouter } from "expo-router";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

const CitizenHomeScreen = () => {
  const { data: reports, isLoading } = useMyReports();
  const router = useRouter();

  return (
    <ScreenContainer>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ gap: 16, flexGrow: 1 }}
      >
        <>
          <AppHeader />
          <ScreenGreeting />
          <ReportCtaCard onPress={() => router.push("/(app)/report/new")} />
          <View className="gap-3">
            <Text className="font-pet-semibold text-base text-foreground">
              {labels.homeScreen.yourReports}
            </Text>
            {isLoading ? (
              <View className="py-8">
                <ActivityIndicator size={"large"} />
              </View>
            ) : (
              <MyReportsList reports={reports ?? []} />
            )}
          </View>
        </>
      </ScrollView>
    </ScreenContainer>
  );
};

export default CitizenHomeScreen;
