import React, { useState } from "react";
import { ScrollView, SafeAreaView, View, Text } from "react-native";
import KeywordSection from "./KeywordSection";
import GenerateButton from "./GenerateButton";
import ImageDisplay from "./ImageDisplay";
import UpgradeSection from "./UpgradeSection";
import GeneratedImagesGallery from "./GeneratedImagesGallery";
import { useImageGenerator } from "@/hooks/useImageGenerator";
import styles from "./styles";
import PinterestButton from "./PinterestButton";
import Separator from "./Separator";
import { useUserFriendlyDescription } from "@/hooks/useUserFriendlyDescription";

export default function DressGenerator() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const { generatedImage } = useImageGenerator();
  const { description, generateDescription } = useUserFriendlyDescription();

  const handleGenerate = (prompt: string) => {
    generateDescription(prompt);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <KeywordSection keywords={keywords} setKeywords={setKeywords} />
        <Separator />
        <GenerateButton
          keywords={keywords}
          label="Generate"
          onGenerate={handleGenerate}
        />
        <Separator />
        {generatedImage && (
          <>
            <ImageDisplay />
            {description && (
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{description}</Text>
              </View>
            )}
            <Separator />
            <UpgradeSection />
            <GenerateButton
              label="Generate Another"
              keywords={keywords}
              onGenerate={handleGenerate}
            />
            <PinterestButton />
          </>
        )}
        <GeneratedImagesGallery />
      </ScrollView>
    </SafeAreaView>
  );
}
