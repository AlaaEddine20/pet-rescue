import { Text, View } from "react-native";

type MetricCardProps = {
  label: string;
  value: number;
  variant?: "accent" | "neutral";
};

export const MetricCard = ({
  label,
  value,
  variant = "neutral",
}: MetricCardProps) => {
  const isAccent = variant === "accent";
  return (
    <View
      className={`flex-1 rounded-lg p-3 ${isAccent ? "bg-accent" : "bg-secondary"}`}
    >
      <Text
        className={`text-xs ${isAccent ? "text-accent-foreground" : "text-muted-foreground"}`}
      >
        {label}
      </Text>
      <Text
        className={`font-pet-semibold text-2xl ${isAccent ? "text-accent-foreground" : "text-foreground"}`}
      >
        {value}
      </Text>
    </View>
  );
};
