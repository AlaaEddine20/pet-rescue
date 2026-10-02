// app/onboarding/volunteer.tsx
import { useCompleteOnboarding } from "@/hooks/useOnboarding";
import { useOrganizations } from "@/hooks/useOrganizations";
import { labels } from "@/locales";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

export default function VolunteerOrgPickerScreen() {
  const { data: organizations, isLoading } = useOrganizations();
  const { volunteerMutation } = useCompleteOnboarding();

  return (
    <View className="flex-1 bg-background p-5">
      <Text className="font-pet-bold text-xl text-foreground">
        {labels.onboarding.volunteer.title}
      </Text>
      <Text className="mt-1 text-sm text-muted-foreground">
        {labels.onboarding.volunteer.description}
      </Text>

      {isLoading ? (
        <ActivityIndicator className="mt-6" />
      ) : (
        <FlatList
          className="mt-4"
          data={organizations}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => volunteerMutation.mutate(item.id)}
              disabled={volunteerMutation.isPending}
              className="rounded-lg bg-secondary p-3"
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
    </View>
  );
}
