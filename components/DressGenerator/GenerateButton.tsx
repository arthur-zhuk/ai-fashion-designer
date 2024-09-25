import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import styles from "./styles";

interface GenerateButtonProps {
  label: string;
  keywords: string[];
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
  info: string;
}

export default function GenerateButton({
  label,
  keywords,
  onGenerate,
  isGenerating,
  info,
}: GenerateButtonProps) {
  const handlePress = () => {
    if (!isGenerating) {
      const prompt = keywords.join(", ");
      onGenerate(prompt);
    }
  };

  const buttonLabel = isGenerating ? info || "Generating..." : label;

  return (
    <TouchableOpacity
      style={[
        styles.generateButton,
        isGenerating && styles.generateButtonDisabled,
      ]}
      onPress={handlePress}
      disabled={isGenerating}
    >
      {isGenerating ? (
        <>
          <ActivityIndicator color="#ffffff" />
          <Text style={styles.buttonText}>{buttonLabel}</Text>
        </>
      ) : (
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      )}
    </TouchableOpacity>
  );
}
