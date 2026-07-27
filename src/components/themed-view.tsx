import { ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

export type ThemedViewProps = SafeAreaViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  type,
  ...otherProps
}: ThemedViewProps) {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[{ backgroundColor: theme[type ?? "background"] }, style]}
      {...otherProps}
    />
  );
}
