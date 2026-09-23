import { Button, ButtonText } from "@/ui/button";
import { Camera } from "lucide-react-native";
import { Text, View } from "react-native";

type ReportCtaCardProps = {
  onPress: () => void;
};

const ReportCtaCard = ({ onPress }: ReportCtaCardProps) => {
  return (
    <View className="items-center rounded-2xl bg-accent p-5">
      <Camera size={28} color="#2E86DE" />
      <Text className="font-pet-semibold mt-2 text-center text-base text-foreground">
        Hai visto un animale in difficoltà?
      </Text>
      <Text className="font-pet-medium mt-1 text-center text-sm text-accent-foreground">
        Foto, descrizione e posizione: bastano 30 secondi.
      </Text>
      <Button
        className="mt-3 w-full rounded-lg bg-blue-600 py-3"
        onPress={onPress}
        accessibilityLabel="Segnala ora"
      >
        <ButtonText className="font-pet-semibold text-white">
          Segnala ora
        </ButtonText>
      </Button>
    </View>
  );
};

export default ReportCtaCard;
