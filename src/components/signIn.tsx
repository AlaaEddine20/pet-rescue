import SubmitButton from "@/components/submit-button";
import ThemedInput from "@/components/themed-input";
import { Spacing, Typography, themes } from "@/constants/theme";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface SignInFormProps {
  submitButtonSlide: SharedValue<number>;
}

export function SignInForm({ submitButtonSlide }: SignInFormProps) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInputsChange = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    console.log("Form submitted:", form);
  };

  const submitButtonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: submitButtonSlide.value,
    transform: [
      {
        translateY: interpolate(
          submitButtonSlide.value,
          [0, 1],
          [SCREEN_HEIGHT, 0],
        ),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <ThemedInput
        id="email-input"
        onChangeText={(value) => handleInputsChange("email", value)}
        placeholder="Email"
        value={form.email}
        accessibilityLabel="Email Input"
      />
      <ThemedInput
        id="password-input"
        onChangeText={(value) => handleInputsChange("password", value)}
        placeholder="Password"
        accessibilityLabel="Password Input"
        secureTextEntry={true}
        value={form.password}
      />
      <Animated.View style={submitButtonAnimatedStyle}>
        <SubmitButton style={styles.button} onSubmit={handleSubmit}>
          <Text style={styles.buttonText}>Sign In</Text>
        </SubmitButton>
      </Animated.View>
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
    marginTop: 10,
  },
  buttonText: {
    color: themes.light.background,
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.md,
  },
});
