import React from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { createStyles } from "./styles";
import {
  COLORS,
  GARMENT_STYLES,
  IMAGE_STYLES,
  PATTERNS,
} from "@/constants/KeywordButtonKeywords";
import KeywordButton from "./KeywordButton";
import { useThemeColor } from "@/hooks/useThemeColor";

interface KeywordSectionProps {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
}

export default function KeywordSection({
  keywords,
  setKeywords,
}: KeywordSectionProps) {
  const { theme } = useThemeColor();
  const styles = createStyles(theme);

  const toggleKeyword = (keyword: string) => {
    if (keywords.includes(keyword)) {
      setKeywords(keywords.filter((k) => k !== keyword));
    } else {
      setKeywords([...keywords, keyword]);
    }
  };

  const renderKeywordSection = (title: string, keywordList: string[]) => (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.styleList}
      >
        {keywordList.map((item) => (
          <KeywordButton
            key={item}
            label={item}
            onPress={toggleKeyword}
            isSelected={keywords.includes(item)}
          />
        ))}
      </ScrollView>
    </>
  );

  return (
    <View style={styles.keywordSection}>
      {renderKeywordSection("Select Garment Style", GARMENT_STYLES)}
      {renderKeywordSection("Select Colors", COLORS)}
      {renderKeywordSection("Select Image Style", IMAGE_STYLES)}
      {renderKeywordSection("Select Pattern", PATTERNS)}

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
