import { useAppFonts } from "@/hooks/useAppFonts";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const ready = useAppFonts();
  if (!ready) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style={"light"} />{" "}
      {/** replace with dynamic value after theme context is ready */}
    </>
  );
}
