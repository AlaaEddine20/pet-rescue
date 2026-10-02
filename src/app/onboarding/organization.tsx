// app/onboarding/organization.tsx
import { useCompleteOnboarding } from "@/hooks/useOnboarding";
import { labels } from "@/locales";
import {
  OrganizationOnboardingSchema,
  OrganizationOnboardingValues,
} from "@/lib/validators";
import { Button, ButtonText } from "@/ui/button";
import { Input, InputField } from "@/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text } from "react-native";

export default function OrganizationSignupScreen() {
  const { organizationMutation } = useCompleteOnboarding();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationOnboardingValues>({
    resolver: zodResolver(OrganizationOnboardingSchema),
    defaultValues: { name: "", taxCode: "" },
  });

  const onSubmit = (values: OrganizationOnboardingValues) => {
    organizationMutation.mutate(values, {
      onError: () =>
        setError("root", {
          type: "manual",
          message: labels.onboarding.organization.errors.submitFailed,
        }),
    });
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ padding: 20, gap: 16 }}
    >
      <Text className="font-pet-bold text-xl text-foreground">
        {labels.onboarding.organization.title}
      </Text>
      <Text className="text-sm text-muted-foreground">
        {labels.onboarding.organization.description}
      </Text>

      <Controller
        control={control}
        name="name"
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <Input className="w-full rounded-lg border-0 bg-secondary p-3">
              <InputField
                placeholder={labels.onboarding.organization.placeholders.name}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                className="font-pet-medium text-base text-foreground"
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
        name="taxCode"
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <Input className="w-full rounded-lg border-0 bg-secondary p-3">
              <InputField
                placeholder={labels.onboarding.organization.placeholders.taxCode}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="characters"
                className="font-pet-medium text-base text-foreground"
              />
            </Input>
            {error?.message && (
              <Text className="text-sm text-destructive">{error.message}</Text>
            )}
          </>
        )}
      />

      {errors.root?.message && (
        <Text className="text-sm text-destructive">{errors.root.message}</Text>
      )}

      <Button
        className="rounded-lg bg-blue-600 py-4"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        <ButtonText className="font-pet-semibold text-white">
          {isSubmitting
            ? labels.onboarding.organization.cta.submitting
            : labels.onboarding.organization.cta.submit}
        </ButtonText>
      </Button>
    </ScrollView>
  );
}
