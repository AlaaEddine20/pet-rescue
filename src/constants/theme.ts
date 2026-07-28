/**
 * Theme colors and typography live in `src/global.css` as Tailwind theme tokens.
 */
import { createContext } from "react";

export type Theme = "light" | "dark";

export const Spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 20,
  xl: 32,
};

export const LOGO_SOURCES = {
  light: require("../../assets/images/logo-light-theme.png"),
  dark: require("../../assets/images/logo-dark-theme.png"),
} as const;

export const LOGO_ANIMATION_DURATION = 1000;
export const FORM_FADE_DURATION = 400;

export const themes = {
  light: {
    text: "#0F2033", // deep navy-black, softer than pure black, on-brand
    background: "#ffffff",
    backgroundElement: "#EEF3F9", // subtle blue tint (was neutral grey)
    backgroundSelected: "#DCE7F4", // light brand-blue tint
    textSecondary: "#2E86DE", // logo pin blue
  },
  dark: {
    text: "#ffffff",
    background: "#123b5e", // kept — matches deep navy in the system
    backgroundElement: "#17324F", // navy-tinted surface (was neutral #212225)
    backgroundSelected: "#1E4162", // lighter navy for selection
    textSecondary: "#5AA9F0", // brighter blue for contrast on navy
  },
};

export const ThemeContext = createContext(themes.light);
