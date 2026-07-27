import { ThemeColor } from "@/constants/theme";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

const backgroundClasses: Record<ThemeColor, string> = {
  text: "bg-text",
  textSecondary: "bg-text-secondary",
  background: "bg-background",
  backgroundElement: "bg-background-element",
  backgroundSelected: "bg-background-selected",
};

export type ThemedViewProps = SafeAreaViewProps & {
  type?: ThemeColor;
};

export function ThemedView({
  className,
  type = "background",
  ...otherProps
}: ThemedViewProps) {
  return (
    <SafeAreaView
      className={`${backgroundClasses[type]} ${className ?? ""}`}
      {...otherProps}
    />
  );
}
