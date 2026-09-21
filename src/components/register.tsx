import { useAuthContext } from "@/hooks/useAuthContext";
import { SignUpUserSchema } from "@/lib/validators";
import { applyAuthError } from "@/mappers/authErrorMapper";
import { SignUpUser } from "@/types/Auth";
import { Button, ButtonText } from "@/ui/button";
import { Input, InputField } from "@/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";

export function RegisterForm() {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignUpUserSchema),
    defaultValues: {
      user_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { signUp } = useAuthContext();

  const onSubmit = async (formData: SignUpUser) => {
    clearErrors("root");
    const { error } = await signUp(formData);
    if (error) applyAuthError(error, setError);
  };

  return (
    <View className="gap-3 w-full flex-1">
      <Controller
        control={control}
        name="user_name"
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error, invalid },
        }) => (
          <>
            <Input className="my-1 w-full rounded-lg border-0 bg-secondary p-3 shadow-sm">
              <InputField
                id="user_name-input"
                onChangeText={onChange}
                placeholder="Name"
                value={value}
                onBlur={onBlur}
                autoCapitalize="none"
                className="font-pet-medium text-base text-foreground"
                accessibilityLabel={
                  error ? `User Name, ${error.message}` : "User Name"
                }
              />
            </Input>
            {error?.message && (
              <Text className="text-sm text-destructive">{error.message}</Text>
            )}
          </>
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
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
                accessibilityLabel={error ? `Email, ${error.message}` : "Email"}
              />
            </Input>
            {error?.message && (
              <Text className="text-sm text-destructive">{error.message}</Text>
            )}
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
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
                accessibilityLabel={
                  error ? `Password, ${error.message}` : "Password"
                }
              />
            </Input>
            {error?.message && (
              <Text className="text-sm text-destructive">{error.message}</Text>
            )}
          </>
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
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
                accessibilityLabel={
                  error
                    ? `Conferma password, ${error.message}`
                    : "Conferma password"
                }
              />
            </Input>
            {error?.message && (
              <Text className="text-sm text-destructive">{error.message}</Text>
            )}
          </>
        )}
      />

      {/* Errore di form generico da server */}
      {errors.root?.message && (
        <View
          className="mt-2 rounded-lg bg-red-50 p-3"
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          <Text className="text-sm text-destructive">
            {errors.root.message}
          </Text>
        </View>
      )}

      <View>
        <Button
          className="mt-2 rounded-lg bg-blue-600 py-4"
          onPress={handleSubmit(onSubmit)}
          accessibilityLabel="Create account"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <ButtonText className="font-pet-semibold text-white">
              Create Account
            </ButtonText>
          )}
        </Button>
      </View>
    </View>
  );
}
