import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import DressGenerator from "@/components/DressGenerator";
import SavedImagesGallery from "@/components/SavedImagesGallery";
import { useSaveImage } from "@/hooks/useSaveImage";
import { useMockRevenueCat } from "@/hooks/useMockRevenueCat";

export default function HomeScreen() {
  const { isProMember } = useRevenueCat();
  const saveImage = useSaveImage();
  const [savedImages, setSavedImages] = useState<string[]>([]);
  const { customerInfo, currentOffering, purchasePackage } =
    useMockRevenueCat();

  const handleImageGenerated = (imageUrl: string) => {
    console.log("Image generated:", imageUrl);
    setSavedImages((prevImages) => [...prevImages, imageUrl]);
  };

  const handleSaveImage = (imageUrl: string) => {
    saveImage(imageUrl);
  };

  const handleDeleteImage = (index: number) => {
    setSavedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handlePurchase = async () => {
    try {
      await purchasePackage();
      console.log("Purchase successful!");
    } catch (error) {
      console.error("Purchase failed:", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <DressGenerator
          onImageGenerated={handleImageGenerated}
          onSaveImage={handleSaveImage}
        />
        <SavedImagesGallery
          savedImages={savedImages}
          onDeleteImage={handleDeleteImage}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    // flex: 1,
    padding: 20,
  },
  subscriptionStatus: {
    marginTop: 20,
    fontSize: 16,
  },
  purchaseButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  purchaseButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
