import { labels } from "@/locales";
import { Icon } from "@/ui/icon";
import { Bell, PawPrint } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type AppHeaderProps = {
  onNotificationsPress?: () => void;
};

const AppHeader = ({ onNotificationsPress }: AppHeaderProps) => {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-2">
        <Icon as={PawPrint} size="xl" className="text-primary" />
        <Text className="font-pet-semibold text-xl text-foreground">
          {labels.common.appName}
        </Text>
      </View>
      <Pressable
        onPress={onNotificationsPress}
        accessibilityRole="button"
        accessibilityLabel={labels.appHeader.a11y.notifications}
        hitSlop={8}
      >
        <Icon as={Bell} size="xl" className="text-muted-foreground" />
      </Pressable>
    </View>
  );
};

export default AppHeader;
