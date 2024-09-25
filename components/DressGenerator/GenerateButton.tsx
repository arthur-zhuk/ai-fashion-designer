import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import styles from "./styles";
import { useImageGenerator } from "@/hooks/useImageGenerator";
import { useGarmentNameGenerator } from "@/hooks/useGarmentNameGenerator";

interface GenerateButtonProps {
  label?: string;
  keywords: string[];
  onGenerate?: (prompt: string) => void;
}

export default function GenerateButton({
  label,
  keywords,
  onGenerate,
}: GenerateButtonProps) {
  const {
    generateImage,
    isImageLoading,
    isPending: isGenerating,
  } = useImageGenerator();
  const {
    mutation: generateGarmentName,
    garmentName,
    isGarmentNameLoading,
  } = useGarmentNameGenerator();

  const isLoading = isImageLoading || isGarmentNameLoading;
  console.log({ isImageLoading, isGarmentNameLoading });

  const handlePress = () => {
    const prompt = keywords.join(", ");
    generateImage(prompt);
    generateGarmentName.mutate(prompt);
    onGenerate && onGenerate(prompt);
  };

  return (
    <TouchableOpacity
      style={styles.generateButton}
      onPress={handlePress}
      disabled={isGenerating}
    >
      {isLoading || isGenerating ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text style={styles.buttonText}>
          {label || garmentName || "Generate"}
        </Text>
      )}
    </TouchableOpacity>
  );
}
