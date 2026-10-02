// app/onboarding/volunteer.tsx
import { useCompleteOnboarding } from "@/hooks/useOnboarding";
import { useOrganizations } from "@/hooks/useOrganizations";
import { labels } from "@/locales";
import { Button, ButtonText } from "@/ui/button";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

export default function VolunteerOrgPickerScreen() {
  const { data: organizations, isLoading, isError } = useOrganizations();
  const { volunteerMutation } = useCompleteOnboarding();
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null);

  return (
    <View className="flex-1 bg-background p-5">
      <Text className="font-pet-bold text-xl text-foreground">
        {labels.onboarding.volunteer.title}
      </Text>
      <Text className="mt-1 text-sm text-muted-foreground">
        {labels.onboarding.volunteer.description}
      </Text>

      <Pressable
        onPress={() => setSelectedOrganizationId(null)}
        disabled={volunteerMutation.isPending}
        accessibilityRole="radio"
        accessibilityState={{ selected: selectedOrganizationId === null }}
        className={
          selectedOrganizationId === null
            ? "mt-4 rounded-lg border border-blue-600 bg-secondary p-3"
            : "mt-4 rounded-lg bg-secondary p-3"
        }
      >
        <Text className="font-pet-medium text-sm text-foreground">
          {labels.onboarding.volunteer.independent}
        </Text>
      </Pressable>

      {isLoading ? (
        <ActivityIndicator className="mt-6" />
      ) : isError ? (
        <Text className="mt-4 text-sm text-destructive">
          {labels.onboarding.volunteer.errors.loadFailed}
        </Text>
      ) : (
        <FlatList
          className="mt-4"
          data={organizations ?? []}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedOrganizationId(item.id)}
              disabled={volunteerMutation.isPending}
              accessibilityRole="radio"
              accessibilityState={{ selected: selectedOrganizationId === item.id }}
              className={
                selectedOrganizationId === item.id
                  ? "rounded-lg border border-blue-600 bg-secondary p-3"
                  : "rounded-lg bg-secondary p-3"
              }
            >
              <Text className="font-pet-medium text-sm text-foreground">
                {item.name}
              </Text>
            </Pressable>
          )}
          ListEmptyComponent={
            <Text className="mt-4 text-center text-sm text-muted-foreground">
              {labels.onboarding.volunteer.empty}
            </Text>
          }
        />
      )}

      {volunteerMutation.isError && (
        <Text className="mt-4 text-sm text-destructive">
          {volunteerMutation.error.message ===
          labels.onboarding.volunteer.errors.organizationIneligible
            ? labels.onboarding.volunteer.errors.organizationIneligible
            : labels.onboarding.volunteer.errors.submitFailed}
        </Text>
      )}
      <Button
        className="mt-4 rounded-lg bg-blue-600 py-4"
        onPress={() => volunteerMutation.mutate(selectedOrganizationId)}
        disabled={volunteerMutation.isPending}
      >
        <ButtonText className="font-pet-semibold text-white">
          {volunteerMutation.isPending
            ? labels.onboarding.volunteer.cta.submitting
            : labels.onboarding.volunteer.cta.submit}
        </ButtonText>
      </Button>
    </View>
  );
}
