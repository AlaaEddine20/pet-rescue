import { SplashScreenController } from "@/components/SplashscreenController";
import { AuthProvider } from "@/providers/AuthProvider";
import { GluestackUIProvider } from "@/ui/gluestack-ui-provider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../globals.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    "NunitoSans-Regular": require("../../assets/fonts/NunitoSans-Regular.ttf"),
    "NunitoSans-Medium": require("../../assets/fonts/NunitoSans-Medium.ttf"),
    "NunitoSans-SemiBold": require("../../assets/fonts/NunitoSans-SemiBold.ttf"),
    "NunitoSans-Bold": require("../../assets/fonts/NunitoSans-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode="system">
      <AuthProvider>
        <SplashScreenController />
        <SafeAreaProvider>
          <Stack />
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </AuthProvider>
    </GluestackUIProvider>
  );
}
