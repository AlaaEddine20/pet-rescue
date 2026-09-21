import { useAuthContext } from "@/hooks/useAuthContext";
import { Stack } from "expo-router";

export default function AppLayout() {
  const { isLoggedIn } = useAuthContext();

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="HomeScreen" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
