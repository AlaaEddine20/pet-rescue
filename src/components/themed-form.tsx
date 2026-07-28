import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { StyleSheet } from "react-native";

export function ThemedForm() {
  return (
    <ThemedView>
      <ThemedText>ThemedForm</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    margin: "auto",
    width: "100%",
    borderRadius: 8,
    borderWidth: 4,
    padding: Spacing.s,
    shadowColor: "0px 2px 4px rgba(238,243,249,0.25)",
  },
});
