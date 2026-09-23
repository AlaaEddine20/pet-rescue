import { Icon } from "@/ui/icon";
import { MapPin } from "lucide-react-native";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type LocationFieldProps = {
  addressLabel: string | null;
  isLoading: boolean;
  error: string | null;
  onRequestLocation: () => void;
};

export function LocationField({
  addressLabel,
  isLoading,
  error,
  onRequestLocation,
}: LocationFieldProps) {
  return (
    <View>
      <Pressable
        onPress={onRequestLocation}
        className="flex-row items-center gap-3 rounded-lg bg-secondary p-3"
      >
        <Icon as={MapPin} size="sm" className="text-primary" />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text className="font-pet-medium flex-1 text-sm text-foreground">
            {addressLabel ?? "Rileva la mia posizione"}
          </Text>
        )}
        {addressLabel && !isLoading && (
          <Text className="font-pet-medium text-xs text-primary">Aggiorna</Text>
        )}
      </Pressable>
      {error && <Text className="mt-1 text-xs text-destructive">{error}</Text>}
    </View>
  );
}
