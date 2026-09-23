import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="NoAuthScreen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
