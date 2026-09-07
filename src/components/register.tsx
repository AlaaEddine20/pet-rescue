import ThemedInput from "@/components/themed-input";
import { Spacing, Typography, themes } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function RegisterForm() {
  return (
    <View style={styles.container}>
      <ThemedInput onChangeText={() => {}} placeholder="Name" />
      <ThemedInput onChangeText={() => {}} placeholder="Email" />
      <ThemedInput
        onChangeText={() => {}}
        placeholder="Password"
        secureTextEntry={true}
      />
      <ThemedInput
        onChangeText={() => {}}
        placeholder="Confirm Password"
        secureTextEntry={true}
      />
      <Pressable style={styles.button}>
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
