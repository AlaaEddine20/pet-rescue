import { Stack } from "expo-router";

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="HomeCitizenScreen" options={{ headerShown: false }} />
      <Stack.Screen
        name="report/new"
        options={{ presentation: "modal", title: "Nuova segnalazione" }}
      />
    </Stack>
  );
};

export default AppLayout;
