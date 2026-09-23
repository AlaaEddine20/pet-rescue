import AppHeader from "@/components/AppHeader";
import MyReportsList from "@/components/MyReportList";
import ReportCtaCard from "@/components/ReportCtaCard";
import ScreenContainer from "@/components/ScreenContainer";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Report } from "@/types/Report";
import { ScrollView, Text, View } from "react-native";

const HomeScreen = () => {
  const { profile } = useAuthContext();
  // to be used for ReportCtaCard onPress={() => router.push("/report/new")}
  /* const router = useRouter(); */

  const MOCK_REPORTS: Report[] = [
    {
      id: "1",
      title: "Gatto vicino al parcheggio",
      createdAt: new Date(Date.now() - 86_400_000).toISOString(),
      status: "pending",
    },
    {
      id: "2",
      title: "Cane senza guinzaglio",
      createdAt: new Date(Date.now() - 86_400_000 * 3).toISOString(),
      status: "rescued",
    },
  ];

  return (
    <ScreenContainer>
      <ScrollView className="flex-1" contentContainerStyle={{ gap: 16 }}>
        <AppHeader />
        <View>
          <Text className="text-lg text-muted-foreground">
            {profile?.user_name ? `Ciao, ${profile.user_name}` : "Ciao!"}
          </Text>
        </View>
        <ReportCtaCard onPress={() => {}} />
        <View className="gap-3">
          <Text className="font-pet-semibold text-base text-foreground">
            Le tue segnalazioni
          </Text>
          <MyReportsList reports={MOCK_REPORTS} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default HomeScreen;
