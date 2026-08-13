import { Typography } from "@/constants/theme";
import { TextVariant } from "@/types/text-component-types";
import React from "react";
import { Text, TextStyle } from "react-native";

interface ThemedTextProps {
  variant: TextVariant;
  children: React.ReactNode;
}

const textVariants: Record<TextVariant, TextStyle> = {
  title: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.xl,
    lineHeight: Typography.lineHeight.xl,
  },
  body: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    lineHeight: Typography.fontSize.md,
  },
  caption: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    lineHeight: Typography.lineHeight.sm,
  },
};

export function ThemedText({ variant, children, ...rest }: ThemedTextProps) {
  return (
    <Text style={textVariants[variant]} {...rest}>
      {children}
    </Text>
  );
}
