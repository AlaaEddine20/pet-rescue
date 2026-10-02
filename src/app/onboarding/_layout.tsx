// app/onboarding/_layout.tsx
import { labels } from "@/locales";
import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: labels.onboarding.navigation.welcome, headerBackVisible: false }}
      />
      <Stack.Screen
        name="organization"
        options={{ title: labels.onboarding.navigation.organization }}
      />
      <Stack.Screen
        name="volunteer"
        options={{ title: labels.onboarding.navigation.volunteer }}
      />
    </Stack>
  );
}
