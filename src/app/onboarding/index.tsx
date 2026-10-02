// app/onboarding/index.tsx
import { RoleCard } from "@/components/RoleCard";
import { useCompleteOnboarding } from "@/hooks/useOnboarding";
import { labels } from "@/locales";
import { useRouter } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { citizenMutation } = useCompleteOnboarding();

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ padding: 20, gap: 16 }}
    >
      <Text className="font-pet-bold text-xl text-foreground">
        {labels.onboarding.roleSelection.title}
      </Text>
      <Text className="text-sm text-muted-foreground">
        {labels.onboarding.roleSelection.description}
      </Text>

      <RoleCard
        emoji="🐾"
        title={labels.onboarding.roleSelection.citizen.title}
        description={labels.onboarding.roleSelection.citizen.description}
        onPress={() => citizenMutation.mutate()}
      />
      <RoleCard
        emoji="🤝"
        title={labels.onboarding.roleSelection.volunteer.title}
        description={labels.onboarding.roleSelection.volunteer.description}
        onPress={() => router.push("/onboarding/volunteer")}
      />
      <RoleCard
        emoji="🏠"
        title={labels.onboarding.roleSelection.organization.title}
        description={labels.onboarding.roleSelection.organization.description}
        onPress={() => router.push("/onboarding/organization")}
      />
    </ScrollView>
  );
}
