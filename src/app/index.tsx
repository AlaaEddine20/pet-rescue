import { ThemedView } from "@/components/themed-view";
import { Image, StyleSheet } from "react-native";

export default function Index() {
  return (
    <ThemedView style={styles.container} type="background">
      <Image
        source={require("../../assets/images/logo-dark.png")}
        style={{ width: "100%", height: "100%", resizeMode: "contain" }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
