import { useAuthContext } from "@/hooks/useAuthContext";
import { SignUpUserSchema } from "@/lib/validators";
import { format, labels } from "@/locales";
import { applyAuthError } from "@/mappers/authErrorMapper";
import { SignUpUser } from "@/types/AuthType";
import { Button, ButtonText } from "@/ui/button";
import { Input, InputField } from "@/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";

const SignUpForm = () => {
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
    if (error) {
      applyAuthError(error, setError);
    }
  };

  return (
    <View className="gap-3 pb-6">
      <Controller
        control={control}
        name="user_name"
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
          <>
            <Input className="my-1 w-full rounded-lg border-0 bg-secondary p-3 shadow-sm">
              <InputField
                id="user_name-input"
                onChangeText={onChange}
                placeholder={labels.signUpForm.placeholders.name}
                value={value}
                onBlur={onBlur}
                autoCapitalize="none"
                className="font-pet-medium text-base text-foreground"
                accessibilityLabel={
                  error &&
                  format(labels.signUpForm.a11y.nameWithError, {
                    error: String(error.message),
                  })
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
                placeholder={labels.common.email}
                value={value}
                onBlur={onBlur}
                autoCapitalize="none"
                className="font-pet-medium text-base text-foreground"
                accessibilityLabel={
                  error &&
                  format(labels.signUpForm.a11y.emailWithError, {
                    error: String(error.message),
                  })
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
                placeholder={labels.common.password}
                secureTextEntry
                value={value}
                onBlur={onBlur}
                autoCapitalize="none"
                className="font-pet-medium text-base text-foreground"
                accessibilityLabel={
                  error &&
                  format(labels.signUpForm.a11y.passwordWithError, {
                    error: String(error.message),
                  })
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
                placeholder={labels.signUpForm.placeholders.confirmPassword}
                secureTextEntry
                value={value}
                onBlur={onBlur}
                autoCapitalize="none"
                className="font-pet-medium text-base text-foreground"
                accessibilityLabel={
                  error &&
                  format(labels.signUpForm.a11y.confirmPasswordWithError, {
                    error: String(error.message),
                  })
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
          accessibilityLabel={labels.signUpForm.a11y.submit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <ButtonText className="font-pet-semibold text-white">
              {labels.signUpForm.cta.submit}
            </ButtonText>
          )}
        </Button>
      </View>
    </View>
  );
};

export default SignUpForm;
