import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useAuthContext } from "@/hooks/useAuthContext";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isBootstrapping } = useAuthContext();

  useEffect(() => {
    if (!isBootstrapping) {
      SplashScreen.hideAsync();
    }
  }, [isBootstrapping]);

  return null;
}
