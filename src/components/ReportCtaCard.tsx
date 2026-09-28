import { labels } from "@/locales";
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
        {labels.reportCtaCard.title}
      </Text>
      <Text className="font-pet-medium mt-1 text-center text-sm text-accent-foreground">
        {labels.reportCtaCard.subtitle}
      </Text>
      <Button
        className="mt-3 w-full rounded-lg bg-blue-600 py-3"
        onPress={onPress}
        accessibilityLabel={labels.reportCtaCard.cta.reportNow}
      >
        <ButtonText className="font-pet-semibold text-white">
          {labels.reportCtaCard.cta.reportNow}
        </ButtonText>
      </Button>
    </View>
  );
};

export default ReportCtaCard;
