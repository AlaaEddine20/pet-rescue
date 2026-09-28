import AppHeader from "@/components/AppHeader";
import MyReportsList from "@/components/MyReportList";
import ReportCtaCard from "@/components/ReportCtaCard";
import ScreenContainer from "@/components/ScreenContainer";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useMyReports } from "@/hooks/useReports";
import { format, labels } from "@/locales";
import { useRouter } from "expo-router";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

const HomeScreen = () => {
  const { profile } = useAuthContext();
  const { data: reports, isLoading, isError } = useMyReports();
  const router = useRouter();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return <Text>{labels.homeScreen.loadError}</Text>;
  }

  return (
    <ScreenContainer>
      <ScrollView className="flex-1" contentContainerStyle={{ gap: 16 }}>
        <AppHeader />
        <View>
          <Text className="text-lg text-muted-foreground">
            {profile?.user_name
              ? format(labels.homeScreen.greeting, {
                  name: profile.user_name,
                })
              : labels.homeScreen.greetingFallback}
          </Text>
        </View>
        <ReportCtaCard onPress={() => router.push("/(app)/report/new")} />
        <View className="gap-3">
          <Text className="font-pet-semibold text-base text-foreground">
            {labels.homeScreen.yourReports}
          </Text>
          <MyReportsList reports={reports ?? []} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default HomeScreen;
