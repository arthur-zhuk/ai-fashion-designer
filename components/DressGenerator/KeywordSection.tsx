import React from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";

import styles from "./styles";
import {
  COLORS,
  GARMENT_STYLES,
  IMAGE_STYLES,
  PATTERNS,
} from "@/constants/KeywordButtonKeywords";
import KeywordButton from "./KeywordButton";

interface KeywordSectionProps {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
}

export default function KeywordSection({
  keywords,
  setKeywords,
}: KeywordSectionProps) {
  const toggleKeyword = (keyword: string) => {
    if (keywords.includes(keyword)) {
      setKeywords(keywords.filter((k) => k !== keyword));
    } else {
      setKeywords([...keywords, keyword]);
    }
  };

  return (
    <View style={styles.keywordSection}>
      <Text style={styles.sectionTitle}>Select Garment Style</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.styleList,
          { paddingBottom: 0, height: 40 },
        ]}
      >
        {GARMENT_STYLES.map((style) => (
          <KeywordButton
            key={style}
            label={style}
            onPress={toggleKeyword}
            isSelected={keywords.includes(style)}
          />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Select Colors</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.styleList,
          { paddingBottom: 0, height: 40 },
        ]}
      >
        {COLORS.map((color) => (
          <KeywordButton
            key={color}
            label={color}
            onPress={toggleKeyword}
            isSelected={keywords.includes(color)}
          />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Select Image Style</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.styleList,
          { paddingBottom: 0, height: 40 },
        ]}
      >
        {IMAGE_STYLES.map((style) => (
          <KeywordButton
            key={style}
            label={style}
            onPress={toggleKeyword}
            isSelected={keywords.includes(style)}
          />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Select Pattern</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.styleList,
          { paddingBottom: 0, height: 40 },
        ]}
      >
        {PATTERNS.map((pattern) => (
          <KeywordButton
            key={pattern}
            label={pattern}
            onPress={toggleKeyword}
            isSelected={keywords.includes(pattern)}
          />
        ))}
      </ScrollView>

      {/* Selected Keywords */}
      <View style={styles.selectedKeywordsContainer}>
        {keywords.map((keyword) => (
          <TouchableOpacity
            key={keyword}
            style={styles.selectedKeyword}
            onPress={() => toggleKeyword(keyword)}
          >
            <Text style={styles.selectedKeywordText}>{keyword} ×</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
