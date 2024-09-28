/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/Colors";
import { useState, useEffect } from "react";
import { useColorScheme } from "react-native";

export type ThemeType = "light" | "dark";

export interface Theme {
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  separatorColor: string;
  sectionTitleColor: string;
  buttonTextColor: string;
  selectedKeywordTextColor: string;
  descriptionTextColor: string;
  borderColor: string;
  shadowColor: string;
  tintColor: string;
  tabIconDefaultColor: string;
  tabIconSelectedColor: string;
  errorColor: string;
}

const lightTheme: Theme = {
  backgroundColor: Colors.light.background,
  textColor: Colors.light.text,
  primaryColor: Colors.light.primary,
  secondaryColor: Colors.light.secondary,
  accentColor: Colors.light.accent,
  separatorColor: Colors.light.separator,
  sectionTitleColor: Colors.light.sectionTitle,
  buttonTextColor: Colors.light.buttonText,
  selectedKeywordTextColor: Colors.light.selectedKeywordText,
  descriptionTextColor: Colors.light.descriptionText,
  borderColor: Colors.light.border,
  shadowColor: Colors.light.shadow,
  tintColor: Colors.light.tint,
  tabIconDefaultColor: Colors.light.tabIconDefault,
  tabIconSelectedColor: Colors.light.tabIconSelected,
  errorColor: Colors.light.accent, // Assuming accent color is used for errors
};

const darkTheme: Theme = {
  backgroundColor: Colors.dark.background,
  textColor: Colors.dark.text,
  primaryColor: Colors.dark.primary,
  secondaryColor: Colors.dark.secondary,
  accentColor: Colors.dark.accent,
  separatorColor: Colors.dark.separator,
  sectionTitleColor: Colors.dark.sectionTitle,
  buttonTextColor: Colors.dark.buttonText,
  selectedKeywordTextColor: Colors.dark.selectedKeywordText,
  descriptionTextColor: Colors.dark.descriptionText,
  borderColor: Colors.dark.border,
  shadowColor: Colors.dark.shadow,
  tintColor: Colors.dark.tint,
  tabIconDefaultColor: Colors.dark.tabIconDefault,
  tabIconSelectedColor: Colors.dark.tabIconSelected,
  errorColor: Colors.dark.accent, // Assuming accent color is used for errors
};

export function useThemeColor() {
  const systemColorScheme = useColorScheme() ?? "light";
  const [theme, setTheme] = useState<ThemeType>(systemColorScheme);

  useEffect(() => {
    setTheme(systemColorScheme);
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  return { theme: currentTheme, toggleTheme, themeType: theme };
}

// Keep the original function for backwards compatibility
export function useThemeColorOriginal(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
