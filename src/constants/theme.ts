/**
 * Theme colors and typography live in `src/global.css` as Tailwind theme tokens.
 */

export type ThemeColor =
  | "text"
  | "textSecondary"
  | "background"
  | "backgroundElement"
  | "backgroundSelected";

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const LOGO_SOURCES = {
  light: require("../../assets/images/logo-light-theme.png"),
  dark: require("../../assets/images/logo-dark-theme.png"),
} as const;

export const LOGO_ANIMATION_DURATION = 1000;
export const FORM_FADE_DURATION = 400;
