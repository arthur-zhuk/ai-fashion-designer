import React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { createStyles } from "./styles";
import { useGarmentNameGenerator } from "@/hooks/useGarmentNameGenerator";
import { useImageGenerator } from "@/hooks/useImageGenerator";

interface ImageDisplayProps {}

const ImageDisplay: React.FC<ImageDisplayProps> = () => {
  const {
    info,
    error,
    generatedImage,
    isPending: isImageLoading,
  } = useImageGenerator();
  const { garmentName, isGarmentNameLoading } = useGarmentNameGenerator();
  const { theme } = useThemeColor();
  const styles = createStyles(theme);

  return (
    <>
      {info ? <Text style={styles.infoText}>{info}</Text> : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {isImageLoading || isGarmentNameLoading ? (
        <ActivityIndicator size="small" color="#D4AF37" />
      ) : garmentName ? (
        <Text style={styles.garmentName}>{garmentName}</Text>
      ) : null}

      <View style={styles.imageContainer}>
        {generatedImage ? (
          <Image
            source={{
              uri: generatedImage,
            }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Text style={styles.placeHolderText}>No image generated yet</Text>
        )}
      </View>
    </>
  );
};

export default ImageDisplay;
