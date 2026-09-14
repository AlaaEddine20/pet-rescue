import { NewUser, newUserSchema } from "@/lib/validators";
import { Button, ButtonText } from "@/ui/button";
import { Input, InputField } from "@/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";

export function RegisterForm() {
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

  const onSubmit = (formData: NewUser) => {
    console.log("Form submitted:", formData);
  };

  return (
    <View className="gap-3 w-full flex-1">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value, onBlur } }) => (
          <>
            <Input className="my-1 w-full rounded-lg border-0 bg-secondary p-3 shadow-sm">
              <InputField
                id="name-input"
                onChangeText={onChange}
                placeholder="Name"
                value={value}
                onBlur={onBlur}
                autoCapitalize="none"
                className="font-pet-medium text-base text-foreground"
              />
            </Input>
            {errors.name?.message && (
              <Text className="text-sm text-destructive">
                {errors.name.message}
              </Text>
            )}
          </>
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur } }) => (
          <>
            <Input className="my-1 w-full rounded-lg border-0 bg-secondary p-3 shadow-sm">
              <InputField
                id="email-input"
                onChangeText={onChange}
                placeholder="Email"
                value={value}
                onBlur={onBlur}
                autoCapitalize="none"
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
            <Input className="my-1 w-full rounded-lg border-0 bg-secondary p-3 shadow-sm">
              <InputField
                id="password-input"
                onChangeText={onChange}
                placeholder="Password"
                secureTextEntry
                value={value}
                onBlur={onBlur}
                autoCapitalize="none"
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
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value, onBlur } }) => (
          <>
            <Input className="my-1 w-full rounded-lg border-0 bg-secondary p-3 shadow-sm">
              <InputField
                id="confirm-password-input"
                onChangeText={onChange}
                placeholder="Confirm Password"
                secureTextEntry
                value={value}
                onBlur={onBlur}
                autoCapitalize="none"
                className="font-pet-medium text-base text-foreground"
              />
            </Input>
            {errors.confirmPassword?.message && (
              <Text className="text-sm text-destructive">
                {errors.confirmPassword.message}
              </Text>
            )}
          </>
        )}
      />
      <View>
        <Button
          className="mt-2 rounded-lg bg-blue-600 py-4"
          onPress={handleSubmit(onSubmit)}
          accessibilityLabel="Create account"
        >
          <ButtonText className="font-pet-semibold text-white">
            Create Account
          </ButtonText>
        </Button>
      </View>
    </View>
  );
}
