import { createContext } from "react";

export type Theme = "light" | "dark";

export const Spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 20,
  xl: 32,
};

export const Typography = {
  fontFamily: {
    regular: "NunitoSans-Regular",
    medium: "NunitoSans-Medium",
    semibold: "NunitoSans-SemiBold",
    bold: "NunitoSans-Bold",
  },

  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },

  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 40,
  },
} as const;

export const LOGO_SOURCES = {
  light: require("../../assets/images/logo-light-theme.png"),
  dark: require("../../assets/images/logo-dark-theme.png"),
} as const;

export const LOGO_ANIMATION_DURATION = 1000;
export const FORM_FADE_DURATION = 400;

export const themes = {
  light: {
    text: "#0F2033",
    background: "#ffffff",
    backgroundElement: "#EEF3F9",
    backgroundSelected: "#DCE7F4",
    textSecondary: "#2E86DE",
    error: "#FF4D4F",
  },
  dark: {
    text: "#ffffff",
    background: "#123b5e",
    backgroundElement: "#17324F",
    backgroundSelected: "#1E4162",
    textSecondary: "#5AA9F0",
    error: "#FF4D4F",
  },
};

export const ThemeContext = createContext(themes.light);
