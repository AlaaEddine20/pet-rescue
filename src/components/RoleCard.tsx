import { Pressable, Text, View } from "react-native";

type RoleCardProps = {
  emoji: string;
  title: string;
  description: string;
  onPress: () => void;
};

export const RoleCard = ({
  emoji,
  title,
  description,
  onPress,
}: RoleCardProps) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={title}
    className="flex-row items-center gap-3 rounded-xl bg-secondary p-4"
  >
    <Text className="text-2xl">{emoji}</Text>
    <View className="flex-1">
      <Text className="font-pet-semibold text-base text-foreground">
        {title}
      </Text>
      <Text className="mt-0.5 text-sm text-muted-foreground">
        {description}
      </Text>
    </View>
  </Pressable>
);
