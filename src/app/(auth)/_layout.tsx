import { useAuthContext } from "@/hooks/useAuthContext";
import { Stack } from "expo-router";

export default function AuthLayout() {
  const { isLoggedIn } = useAuthContext();

  return (
    <Stack>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="noAuthScreen" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
