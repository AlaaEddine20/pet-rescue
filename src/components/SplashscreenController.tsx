import { SplashScreen } from "expo-router";
import { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  return null;
}
