import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

const ThemedForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handlefields = () => {};

  return (
    <ThemedView style={styles.formContainer}>
      <TextInput value={email} />
      <TextInput value={password} />
      <TextInput value={username} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    margin: "auto",
    width: "100%",
    /* borderRadius: 8,
    borderWidth: 1, */
    padding: Spacing.s,
    boxShadow: "0px 2px 4px",
    shadowColor: "rgba(238,243,249,0.25)",
  },
});

export default ThemedForm;
