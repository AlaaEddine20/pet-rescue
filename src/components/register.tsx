import ThemedInput from "@/components/themed-input";
import { Spacing, Typography, themes } from "@/constants/theme";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputsChange = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    console.log("Form submitted:", form);
  };

  return (
    <View style={styles.container}>
      <ThemedInput
        onChangeText={(value) => handleInputsChange("name", value)}
        placeholder="Name"
        value={form.name}
      />
      <ThemedInput
        onChangeText={(value) => handleInputsChange("email", value)}
        placeholder="Email"
        value={form.email}
      />
      <ThemedInput
        onChangeText={(value) => handleInputsChange("password", value)}
        placeholder="Password"
        secureTextEntry={true}
        value={form.password}
      />
      <ThemedInput
        onChangeText={(value) => handleInputsChange("confirmPassword", value)}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={form.confirmPassword}
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.s,
    width: "100%",
  },
  button: {
    backgroundColor: themes.light.textSecondary,
    borderRadius: 8,
    paddingVertical: Spacing.m,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: themes.light.background,
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.md,
  },
});
