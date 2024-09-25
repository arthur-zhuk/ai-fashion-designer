import React, { useState, useRef, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StatusBar,
} from "react-native";
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
  const [isGenerating, setIsGenerating] = useState(false);
  const { generatedImage, info, error, isPending, generateImage } =
    useImageGenerator();
  const { description, generateDescription } = useUserFriendlyDescription();
  const scrollViewRef = useRef<ScrollView>(null);
  const imageDisplayRef = useRef<View>(null);

  const scrollToImage = useCallback(() => {
    if (scrollViewRef.current && imageDisplayRef.current) {
      imageDisplayRef.current.measureLayout(
        scrollViewRef.current.getInnerViewNode(),
        (x, y) => {
          scrollViewRef.current?.scrollTo({ y: y, animated: true });
        }
      );
    }
  }, []);

  const handleGenerate = useCallback(
    async (prompt: string) => {
      setIsGenerating(true);
      generateDescription(prompt);
      try {
        const imageGenerated = await generateImage(prompt);
        if (imageGenerated) {
          setTimeout(scrollToImage, 100);
        }
      } finally {
        setIsGenerating(false);
      }
    },
    [generateDescription, generateImage, scrollToImage]
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}
      >
        <KeywordSection keywords={keywords} setKeywords={setKeywords} />
        <Separator />
        <GenerateButton
          keywords={keywords}
          label="Generate"
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          info={info}
        />
        <Separator />
        {info && <Text style={styles.infoText}>{info}</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {isPending && <ActivityIndicator size="large" color="#D4AF37" />}
        {generatedImage && (
          <View ref={imageDisplayRef}>
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
              isGenerating={isGenerating}
              info={info}
            />
            <PinterestButton />
          </View>
        )}
        <GeneratedImagesGallery />
      </ScrollView>
    </View>
  );
}
