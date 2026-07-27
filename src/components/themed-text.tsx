import { Text, type TextProps } from "react-native";

import { ThemeColor } from "@/constants/theme";

export type ThemedTextProps = TextProps & {
  type?: keyof typeof typeClasses;
  themeColor?: ThemeColor;
};

const typeClasses = {
  default: "text-body",
  title: "text-title",
  small: "text-small",
  smallBold: "text-small-bold",
  subtitle: "text-subtitle",
  code: "text-code font-mono android:font-bold",
};

const colorClasses: Record<ThemeColor, string> = {
  text: "text-text",
  textSecondary: "text-text-secondary",
  background: "text-background",
  backgroundElement: "text-background-element",
  backgroundSelected: "text-background-selected",
};

export function ThemedText({
  className,
  type = "default",
  themeColor = "text",
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      className={`${colorClasses[themeColor]} ${typeClasses[type]} ${className ?? ""}`}
      {...rest}
    />
  );
}
