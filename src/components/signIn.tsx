import SubmitButton from "@/components/submit-button";
import ThemedInput from "@/components/themed-input";
import { Spacing, Typography, themes } from "@/constants/theme";
import { RegisteredUser, registeredUserSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisteredUser>({
    resolver: zodResolver(registeredUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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

  const onSubmit = (formData: RegisteredUser) => {
    console.log("Form submitted:", formData);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur } }) => (
          <ThemedInput
            id="email-input"
            onChangeText={onChange}
            placeholder="Email"
            value={value}
            onBlur={onBlur}
            error={errors.email?.message}
            accessibilityLabel="Email Input"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, onBlur } }) => (
          <ThemedInput
            id="password-input"
            onChangeText={onChange}
            placeholder="Password"
            secureTextEntry={true}
            value={value}
            onBlur={onBlur}
            error={errors.password?.message}
            accessibilityLabel="Password Input"
          />
        )}
      />

      <Animated.View style={submitButtonAnimatedStyle}>
        <SubmitButton style={styles.button} onSubmit={handleSubmit(onSubmit)}>
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
