import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useAuthContext } from "@/hooks/useAuthContext";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isAuthBootstrapping } = useAuthContext();

  useEffect(() => {
    if (!isAuthBootstrapping) {
      SplashScreen.hideAsync();
    }
  }, [isAuthBootstrapping]);

  return null;
}
