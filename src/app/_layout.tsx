import ScreenContainer from "@/components/ScreenContainer";
import { SplashScreenController } from "@/components/SplashscreenController";
import { useAuthContext } from "@/hooks/useAuthContext";
import { AuthProvider } from "@/providers/AuthProvider";
import { GluestackUIProvider } from "@/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../globals.css";

function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuthContext();

  if (isLoading)
    return (
      <ScreenContainer className="h-full w-full justify-center items-center">
        <ActivityIndicator size={"large"} />
      </ScreenContainer>
    );

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

const RootLayout = () => {
  const [loaded] = useFonts({
    "NunitoSans-Regular": require("../../assets/fonts/NunitoSans-Regular.ttf"),
    "NunitoSans-Medium": require("../../assets/fonts/NunitoSans-Medium.ttf"),
    "NunitoSans-SemiBold": require("../../assets/fonts/NunitoSans-SemiBold.ttf"),
    "NunitoSans-Bold": require("../../assets/fonts/NunitoSans-Bold.ttf"),
  });

  const queryClient = new QueryClient();

  if (!loaded) return null;

  return (
    <GluestackUIProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SafeAreaProvider>
            <SplashScreenController />
            <RootNavigator />
            <StatusBar style="dark" />
          </SafeAreaProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
};

export default RootLayout;
