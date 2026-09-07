import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

/**
 * Loads the app's custom fonts and hides the splash screen once ready
 * (or if loading fails). Use this only for platforms/setups where the
 * expo-font config plugin isn't sufficient (e.g. web).
 *
 * Returns `true` once fonts are loaded and the UI is safe to render.
 */
export function useAppFonts() {
  const [loaded, error] = useFonts({
    "NunitoSans-Regular": require("../../assets/fonts/NunitoSans-Regular.ttf"),
    "NunitoSans-Medium": require("../../assets/fonts/NunitoSans-Medium.ttf"),
    "NunitoSans-SemiBold": require("../../assets/fonts/NunitoSans-SemiBold.ttf"),
    "NunitoSans-Bold": require("../../assets/fonts/NunitoSans-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return loaded || !!error;
}
