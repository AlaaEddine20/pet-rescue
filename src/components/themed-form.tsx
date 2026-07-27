import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export function ThemedForm() {
  return (
    <ThemedView className="m-auto w-full rounded-lg border-2 border-background-element p-4 shadow-[0px_2px_4px_rgba(238,243,249,0.25)]">
      <ThemedText className="text-center">ThemedForm</ThemedText>
    </ThemedView>
  );
}
