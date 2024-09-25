import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { useImageGenerator } from "@/hooks/useImageGenerator";
import { handleShareToPinterest } from "@/utils/shareImage";

export default function PinterestButton() {
  const { generatedImage } = useImageGenerator();

  const shareDescription =
    "Generate your own fashion pieces here: https://example.com/app-download";

  return (
    <TouchableOpacity
      style={styles.pinterestButton}
      onPress={() =>
        handleShareToPinterest({
          imageUrl: generatedImage,
          description: shareDescription,
        })
      }
    >
      <Ionicons name="logo-pinterest" size={24} color="#FFFFFF" />
      <Text style={styles.pinterestButtonText}>Share</Text>
    </TouchableOpacity>
  );
}
