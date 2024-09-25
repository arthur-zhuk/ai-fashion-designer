import { GARMENT_STYLES } from "@/constants/KeywordButtonKeywords";

export const generatePrompt = (keywords: string): string => {
  const garmentType =
    GARMENT_STYLES.find((style) =>
      keywords.toLowerCase().includes(style.toLowerCase())
    ) || "Garment";

  return `Create a detailed and vivid description for a ${garmentType} with the following keywords: ${keywords}. Focus on key visual elements and style.`;
};
