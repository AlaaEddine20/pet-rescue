import { RegisteredUser, registeredUserSchema } from "@/lib/validators";
import { Button, ButtonText } from "@/ui/button";
import { Input, InputField } from "@/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";

export function SignInForm() {
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

  const onSubmit = (formData: RegisteredUser) => {
    console.log("Form submitted:", formData);
  };

  return (
    <View className="gap-2 w-full">
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur } }) => (
          <>
            <Input className="my-1 w-full rounded-lg border-0 bg-secondary p-4 shadow-sm">
              <InputField
                id="email-input"
                onChangeText={onChange}
                placeholder="Email"
                value={value}
                onBlur={onBlur}
                autoCapitalize="none"
                accessibilityLabel="Email Input"
                className="font-pet-medium text-base text-foreground"
              />
            </Input>
            {errors.email?.message && (
              <Text className="text-sm text-destructive">
                {errors.email.message}
              </Text>
            )}
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, onBlur } }) => (
          <>
            <Input className="my-1 w-full rounded-lg border-0 bg-secondary p-4 shadow-sm">
              <InputField
                id="password-input"
                onChangeText={onChange}
                placeholder="Password"
                secureTextEntry
                value={value}
                onBlur={onBlur}
                autoCapitalize="none"
                accessibilityLabel="Password Input"
                className="font-pet-medium text-base text-foreground"
              />
            </Input>
            {errors.password?.message && (
              <Text className="text-sm text-destructive">
                {errors.password.message}
              </Text>
            )}
          </>
        )}
      />

      <View>
        <Button
          className="mt-2 rounded-lg bg-blue-600 py-4"
          onPress={handleSubmit(onSubmit)}
          accessibilityLabel="Sign in"
        >
          <ButtonText className="font-pet-semibold text-white">
            Sign In
          </ButtonText>
        </Button>
      </View>
    </View>
  );
}
