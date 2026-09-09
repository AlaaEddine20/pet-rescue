import SubmitButton from "@/components/submit-button";
import ThemedInput from "@/components/themed-input";
import { Spacing, Typography, themes } from "@/constants/theme";
import { NewUser, newUserSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface RegisterFormProps {
  submitButtonSlide: SharedValue<number>;
}

export function RegisterForm({ submitButtonSlide }: RegisterFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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

  const onSubmit = (formData: NewUser) => {
    console.log("Form submitted:", formData);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value, onBlur } }) => (
          <ThemedInput
            id="name-input"
            onChangeText={onChange}
            placeholder="Name"
            value={value}
            onBlur={onBlur}
            error={errors.name && errors.name.message}
          />
        )}
      />
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
            error={errors.email && errors.email.message}
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
            error={errors.password && errors.password.message}
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value, onBlur } }) => (
          <ThemedInput
            id="confirm-password-input"
            onChangeText={onChange}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={value}
            onBlur={onBlur}
            error={errors.confirmPassword && errors.confirmPassword.message}
          />
        )}
      />
      <Animated.View style={submitButtonAnimatedStyle}>
        <SubmitButton
          style={styles.button}
          onSubmit={handleSubmit(onSubmit, onInvalid)}
        >
          <Text style={styles.buttonText}>Create Account</Text>
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
  error: {
    color: themes.light.error,
    fontSize: Typography.fontSize.xs,
  },
});
