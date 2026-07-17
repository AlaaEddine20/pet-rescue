import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export function ThemedForm() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>ThemedForm</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  text: {
    textAlign: "center",
  },
});
