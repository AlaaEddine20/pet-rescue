import ThemedInput from "@/components/themed-input";
import { Spacing, Typography, themes } from "@/constants/theme";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function SignInForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInputsChange = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    console.log("Form submitted:", form);
  };
  return (
    <View style={styles.container}>
      <ThemedInput
        id="email-input"
        onChangeText={(value) => handleInputsChange("email", value)}
        placeholder="Email"
        value={form.email}
      />
      <ThemedInput
        id="password-input"
        onChangeText={(value) => handleInputsChange("password", value)}
        placeholder="Password"
        secureTextEntry={true}
        value={form.password}
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
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
