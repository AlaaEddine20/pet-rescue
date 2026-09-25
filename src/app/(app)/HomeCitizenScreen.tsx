import AppHeader from "@/components/AppHeader";
import MyReportsList from "@/components/MyReportList";
import ReportCtaCard from "@/components/ReportCtaCard";
import ScreenContainer from "@/components/ScreenContainer";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useMyReports } from "@/hooks/useReports";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

const HomeScreen = () => {
  const { profile } = useAuthContext();
  const { data: reports, isLoading, isError } = useMyReports();
  const router = useRouter();

  return (
    <ScreenContainer>
      <ScrollView className="flex-1" contentContainerStyle={{ gap: 16 }}>
        <AppHeader />
        <View>
          <Text className="text-lg text-muted-foreground">
            {profile?.user_name ? `Ciao, ${profile.user_name}` : "Ciao!"}
          </Text>
        </View>
        <ReportCtaCard onPress={() => router.push("/(app)/report/new")} />
        <View className="gap-3">
          <Text className="font-pet-semibold text-base text-foreground">
            Le tue segnalazioni
          </Text>
          <MyReportsList reports={reports ?? []} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default HomeScreen;
