import React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import styles from "./styles";
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
        <Image
          source={{
            uri: generatedImage,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </>
  );
};

export default ImageDisplay;
