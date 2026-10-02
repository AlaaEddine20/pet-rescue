import ScreenContainer from "@/components/ScreenContainer";
import { SplashScreenController } from "@/components/SplashscreenController";
import { useAuthContext } from "@/hooks/useAuthContext";
import { AuthProvider } from "@/providers/AuthProvider";
import { Button, ButtonText } from "@/ui/button";
import { GluestackUIProvider } from "@/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../globals.css";

function RootNavigator() {
  const {
    isLoggedIn,
    profile,
    isBootstrapping,
    profileQueryError,
    refreshProfile,
  } = useAuthContext();

  const needsOnboarding = isLoggedIn && profile?.role === null;

  if (isBootstrapping)
    return (
      <ScreenContainer className="h-full w-full justify-center items-center">
        <ActivityIndicator size={"large"} />
      </ScreenContainer>
    );

  if (profileQueryError) {
    return (
      <ScreenContainer className="h-full w-full items-center justify-center">
        <Text>Impossibile caricare il profilo.</Text>

        <Button onPress={refreshProfile}>
          <ButtonText>Riprova</ButtonText>
        </Button>
      </ScreenContainer>
    );
  }

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn && !needsOnboarding}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={needsOnboarding}>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
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
