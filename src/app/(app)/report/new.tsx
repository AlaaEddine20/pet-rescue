import { LocationField } from "@/components/LocationField";
import { PhotoPicker } from "@/components/PhotoPicker";
import { SegmentedToggle } from "@/components/ThemedSegmentedToggle";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { NewReportFormValues, NewReportSchema } from "@/lib/validators";
import { labels } from "@/locales";
import { createReport } from "@/services/report";
import { AnimalType, NewReport } from "@/types/ReportType";
import { Button, ButtonText } from "@/ui/button";
import { Input, InputField } from "@/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function NewReportScreen() {
  const router = useRouter();
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const { location, isLocationLoading, locationError, fetchLocation } =
    useCurrentLocation();
  const [photo, setPhoto] = useState<{ uri: string; base64: string } | null>(
    null,
  );

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<NewReportFormValues>({
    resolver: zodResolver(NewReportSchema),
    defaultValues: { animalType: "dog", description: "" },
  });

  const { mutate: submitReport, isPending: isSubmitting } = useMutation({
    mutationFn: (report: NewReport) => createReport(user!.id, report),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["reports", "mine", user!.id],
      });
      Alert.alert(
        labels.newReportScreen.alerts.submitSuccessTitle,
        labels.newReportScreen.alerts.submitSuccessMessage,
      );
      router.back();
    },
    onError: () => {
      setError("root", {
        type: "manual",
        message: labels.newReportScreen.errors.submitFailed,
      });
    },
  });

  const onSubmit = async (values: NewReportFormValues) => {
    if (!photo) {
      setError("root", {
        type: "manual",
        message: labels.newReportScreen.errors.photoRequired,
      });
      return;
    }
    if (!location) {
      setError("root", {
        type: "manual",
        message: labels.newReportScreen.errors.locationRequired,
      });
      return;
    }

    submitReport({
      animalType: values.animalType as AnimalType,
      description: values.description,
      photo,
      latitude: location.latitude,
      longitude: location.longitude,
      addressLabel: location.addressLabel,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ padding: 20, gap: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="font-pet-bold text-lg text-foreground">
          {labels.newReportScreen.title}
        </Text>

        <PhotoPicker photo={photo} onPhotoSelected={setPhoto} />

        <Controller
          control={control}
          name="animalType"
          render={({ field: { value, onChange } }) => (
            <SegmentedToggle
              value={value}
              onChange={(v: string) => onChange(v)}
              options={[
                { label: labels.newReportScreen.animalType.dog, value: "dog" },
                { label: labels.newReportScreen.animalType.cat, value: "cat" },
                {
                  label: labels.newReportScreen.animalType.other,
                  value: "other",
                },
              ]}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <Input className="w-full rounded-lg border-0 bg-secondary p-3">
                <InputField
                  placeholder={labels.newReportScreen.placeholders.description}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={4}
                  className="font-pet-medium text-base text-foreground"
                />
              </Input>
              {error?.message && (
                <Text className="text-sm text-destructive">
                  {error.message}
                </Text>
              )}
            </>
          )}
        />

        <LocationField
          addressLabel={location?.addressLabel ?? null}
          isLoading={isLocationLoading}
          error={locationError}
          onRequestLocation={fetchLocation}
        />

        {errors.root?.message && (
          <View
            className="rounded-lg bg-red-50 p-3"
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
          >
            <Text className="text-sm text-destructive">
              {errors.root.message}
            </Text>
          </View>
        )}

        <Button
          className="rounded-lg bg-blue-600 py-4"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          accessibilityLabel={labels.newReportScreen.cta.submit}
        >
          <ButtonText className="font-pet-semibold text-white">
            {isSubmitting
              ? labels.newReportScreen.cta.submitting
              : labels.newReportScreen.cta.submit}
          </ButtonText>
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
