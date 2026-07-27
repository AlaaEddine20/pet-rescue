import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

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
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.light.backgroundElement,
    margin: "auto",
    shadowColor: Colors.light.backgroundElement,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  text: {
    textAlign: "center",
  },
});
