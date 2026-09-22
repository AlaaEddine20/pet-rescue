import { useAuthContext } from "@/hooks/useAuthContext";
import { LoginUserSchema } from "@/lib/validators";
import { LoginUser } from "@/types/Auth";
import { Button, ButtonText } from "@/ui/button";
import { Input, InputField } from "@/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";
import { applyAuthError } from "../mappers/authErrorMapper";

const SignInForm = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginUser>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { signIn } = useAuthContext();

  const onSubmit = async (formData: LoginUser) => {
    clearErrors("root");
    const { error } = await signIn(formData);
    if (error) applyAuthError(error, setError);
  };

  return (
    <View className="gap-3 w-full">
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
                accessibilityLabel={error && `Email, ${error.message}`}
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
                accessibilityLabel={error && `Password, ${error.message}`}
              />
            </Input>
            {error?.message && (
              <Text className="text-sm text-destructive">{error.message}</Text>
            )}
          </>
        )}
      />

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
          accessibilityLabel="Sign in"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <ButtonText className="font-pet-semibold text-white">
              Login
            </ButtonText>
          )}
        </Button>
      </View>
    </View>
  );
};

export default SignInForm;
