import React, { useState, useRef, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import KeywordSection from "./KeywordSection";
import GenerateButton from "./GenerateButton";
import ImageDisplay from "./ImageDisplay";
import UpgradeSection from "./UpgradeSection";
import GeneratedImagesGallery from "./GeneratedImagesGallery";
import { useImageGenerator } from "@/hooks/useImageGenerator";
import { createStyles } from "./styles";
import PinterestButton from "./PinterestButton";
import Separator from "./Separator";
import { useUserFriendlyDescription } from "@/hooks/useUserFriendlyDescription";
import { useGarmentNameGenerator } from "@/hooks/useGarmentNameGenerator";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function DressGenerator() {
  const { theme, toggleTheme, themeType } = useThemeColor();
  const styles = createStyles(theme);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { generatedImage, info, error, isPending, generateImage } =
    useImageGenerator();
  const { description, generateDescription } = useUserFriendlyDescription();
  const { garmentName, mutation: garmentNameMutation } =
    useGarmentNameGenerator();
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
      garmentNameMutation.mutate(prompt);
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
      <TouchableOpacity style={styles.themeToggleButton} onPress={toggleTheme}>
        <Text style={[styles.themeToggleText, { color: theme.textColor }]}>
          {themeType === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </Text>
      </TouchableOpacity>
      <View style={styles.innerContainer}>
        <StatusBar
          barStyle={themeType === "dark" ? "light-content" : "dark-content"}
          backgroundColor={theme.backgroundColor}
        />
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
          {info && (
            <Text style={[styles.infoText, { color: theme.textColor }]}>
              {info}
            </Text>
          )}
          {error && (
            <Text style={[styles.errorText, { color: theme.errorColor }]}>
              {error}
            </Text>
          )}
          {isPending && (
            <ActivityIndicator size="large" color={theme.primaryColor} />
          )}
          {generatedImage && (
            <View ref={imageDisplayRef}>
              {description && (
                <View style={styles.descriptionContainer}>
                  <Text
                    style={[styles.descriptionText, { color: theme.textColor }]}
                  >
                    {description}
                  </Text>
                </View>
              )}
              <ImageDisplay />
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
    </View>
  );
}
