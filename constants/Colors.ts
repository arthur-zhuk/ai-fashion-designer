/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const lightColors = {
  background: "#FFF5F5", // Soft pink background
  text: "#4A4A4A", // Dark gray for text
  primary: "#FF85A2", // Soft pink
  secondary: "#FFB3BA", // Light pink
  accent: "#7FCDCD", // Soft teal
  separator: "#FFD1DC", // Very light pink
  sectionTitle: "#FF69B4", // Hot pink for section titles
  buttonText: "#FFFFFF", // White text on buttons
  selectedKeywordText: "#4A4A4A", // Dark gray text on selected keywords
  descriptionText: "#6D6D6D", // Medium gray for descriptions
  border: "#FFB3BA", // Light pink for borders
  shadow: "rgba(255, 133, 162, 0.2)", // Soft pink shadow
};

const darkColors = {
  background: "#2B2B2B", // Dark background
  text: "#F0E6E6", // Soft white for text
  primary: "#FF85A2", // Soft pink (same as light mode)
  secondary: "#FFB3BA", // Light pink (same as light mode)
  accent: "#7FCDCD", // Soft teal (same as light mode)
  separator: "#3D3D3D", // Dark gray separator
  sectionTitle: "#FFB3BA", // Light pink for section titles
  buttonText: "#FFFFFF", // White text on buttons
  selectedKeywordText: "#2B2B2B", // Dark background color for contrast
  descriptionText: "#D0C9C9", // Light gray for descriptions
  border: "#FF85A2", // Soft pink for borders
  shadow: "rgba(255, 133, 162, 0.1)", // Soft pink shadow (more subtle in dark mode)
};

export const Colors = {
  light: {
    ...lightColors,
    tint: lightColors.primary,
    tabIconDefault: lightColors.separator,
    tabIconSelected: lightColors.primary,
  },
  dark: {
    ...darkColors,
    tint: darkColors.primary,
    tabIconDefault: darkColors.separator,
    tabIconSelected: darkColors.primary,
  },
};
