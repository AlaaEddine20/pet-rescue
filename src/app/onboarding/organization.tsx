// app/onboarding/organization.tsx
import { useCompleteOnboarding } from "@/hooks/useOnboarding";
import { useRuntsEntityByTaxCode } from "@/hooks/useRuntsEntityByTaxCode";
import { labels } from "@/locales";
import {
  OrganizationOnboardingSchema,
  OrganizationOnboardingValues,
} from "@/lib/validators";
import { Button, ButtonText } from "@/ui/button";
import { Input, InputField } from "@/ui/input";
import type { RuntsEntity } from "@/types/RuntsEntityType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { ScrollView, Text } from "react-native";

export default function OrganizationSignupScreen() {
  const { organizationMutation } = useCompleteOnboarding();
  const [verifiedEntity, setVerifiedEntity] = useState<RuntsEntity | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationOnboardingValues>({
    resolver: zodResolver(OrganizationOnboardingSchema),
    defaultValues: { name: "", taxCode: "" },
  });
  const taxCode = useWatch({ control, name: "taxCode" });
  const runtsLookup = useRuntsEntityByTaxCode(taxCode, false);

  const verifyTaxCode = async () => {
    setVerifiedEntity(null);
    setVerificationError(null);
    clearErrors("taxCode");

    const parsed = OrganizationOnboardingSchema.shape.taxCode.safeParse(
      getValues("taxCode"),
    );
    if (!parsed.success) {
      setError("taxCode", {
        type: "manual",
        message: parsed.error.issues[0]?.message,
      });
      return;
    }

    const result = await runtsLookup.refetch();
    if (getValues("taxCode").trim().toUpperCase() !== parsed.data) return;

    if (result.error) {
      setVerificationError(labels.onboarding.organization.errors.runtsLookupFailed);
    } else if (!result.data) {
      setVerificationError(labels.onboarding.organization.errors.runtsNotFound);
    } else {
      setVerifiedEntity(result.data);
    }
  };

  const onSubmit = (values: OrganizationOnboardingValues) => {
    if (verifiedEntity?.tax_code !== values.taxCode) {
      setError("taxCode", {
        type: "manual",
        message: labels.onboarding.organization.errors.verifyRequired,
      });
      return;
    }

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
                onChangeText={(text) => {
                  onChange(text);
                  setVerifiedEntity(null);
                  setVerificationError(null);
                  clearErrors("taxCode");
                }}
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

      <Button
        variant="secondary"
        onPress={() => void verifyTaxCode()}
        disabled={runtsLookup.isFetching || organizationMutation.isPending}
      >
        <ButtonText>
          {runtsLookup.isFetching
            ? labels.onboarding.organization.runts.verifying
            : labels.onboarding.organization.runts.verify}
        </ButtonText>
      </Button>
      {verificationError && (
        <Text className="text-sm text-destructive">{verificationError}</Text>
      )}
      {verifiedEntity && (
        <Text className="text-sm text-foreground">
          {labels.onboarding.organization.runts.verified} {verifiedEntity.name}
        </Text>
      )}

      {errors.root?.message && (
        <Text className="text-sm text-destructive">{errors.root.message}</Text>
      )}

      <Button
        className="rounded-lg bg-blue-600 py-4"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting || organizationMutation.isPending || runtsLookup.isFetching}
      >
        <ButtonText className="font-pet-semibold text-white">
          {organizationMutation.isPending
            ? labels.onboarding.organization.cta.submitting
            : labels.onboarding.organization.cta.submit}
        </ButtonText>
      </Button>
    </ScrollView>
  );
}
