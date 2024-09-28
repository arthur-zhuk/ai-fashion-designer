import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useThemeColor, Theme } from "@/hooks/useThemeColor";
import { createStyles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";

interface KeywordButtonProps {
  label: string;
  onPress: (keyword: string) => void;
  isSelected: boolean;
}

const KeywordButton: React.FC<KeywordButtonProps> = ({
  label,
  onPress,
  isSelected,
}) => {
  const { theme } = useThemeColor();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selectedButton]}
      onPress={() => onPress(label)}
    >
      <LinearGradient
        colors={[theme.primaryColor, theme.secondaryColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.buttonGradient}
      >
        <Text
          style={[styles.buttonText, isSelected && styles.selectedButtonText]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default KeywordButton;
