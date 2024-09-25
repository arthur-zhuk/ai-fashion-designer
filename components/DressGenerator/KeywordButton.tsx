import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

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
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selectedButton]}
      onPress={() => onPress(label)}
    >
      <Text
        style={[styles.buttonText, isSelected && styles.selectedButtonText]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2A2A2A",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#4A4A4A",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 40,
  },
  selectedButton: {
    backgroundColor: "#D4AF37",
    borderColor: "#D4AF37",
  },
  buttonText: {
    color: "#E0E0E0",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Helvetica Neue, sans-serif",
    textAlign: "center",
  },
  selectedButtonText: {
    color: "#1A1A1A",
    fontWeight: "600",
  },
});

export default KeywordButton;
