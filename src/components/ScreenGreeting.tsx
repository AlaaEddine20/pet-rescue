import { useAuthContext } from "@/hooks/useAuthContext";
import { format, labels } from "@/locales";
import { Text, View } from "react-native";

export const ScreenGreeting = () => {
  const { profile } = useAuthContext();

  const greeting = profile?.user_name
    ? format(labels.homeScreen.greeting, {
        name: profile.user_name,
      })
    : labels.homeScreen.greetingFallback;

  return (
    <View>
      <Text className="text-sm text-muted-foreground">{greeting}</Text>
    </View>
  );
};
