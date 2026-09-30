import { labels } from "@/locales";
import { Stack } from "expo-router";

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="CitizenHomeScreen" options={{ headerShown: false }} />
      <Stack.Screen
        name="report/new"
        options={{
          presentation: "modal",
          title: labels.newReportScreen.title,
        }}
      />
    </Stack>
  );
};

export default AppLayout;
