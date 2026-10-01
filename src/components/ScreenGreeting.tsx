import { useAuthContext } from "@/hooks/useAuthContext";
import { format, labels } from "@/locales";
import { Text, View } from "react-native";

interface ScreenGreetingProps {
  title?: string;
}

export const ScreenGreeting = ({ title }: ScreenGreetingProps) => {
  const { profile } = useAuthContext();

  const greeting = profile?.user_name
    ? format(labels.homeScreen.greeting, {
        name: profile.user_name,
      })
    : labels.homeScreen.greetingFallback;

  return (
    <View>
      <Text className="text-sm text-muted-foreground">{greeting}</Text>
      <Text className="text-2xl font-pet-bold text-foreground">{title}</Text>
    </View>
  );
};
