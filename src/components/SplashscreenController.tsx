import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useAuthContext } from "@/hooks/useAuthContext";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading } = useAuthContext();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  return null;
}
