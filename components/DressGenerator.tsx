import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import OpenAI from "openai";
import { usePromptGenerator } from "@/hooks/usePromptGenerator";
import { useImageGenerator } from "@/hooks/useImageGenerator";
import { useUserFriendlyDescription } from "@/hooks/useUserFriendlyDescription";

const openAiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const replicateToken = process.env.EXPO_PUBLIC_REPLICATE_API_TOKEN;

interface DressGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
  onSaveImage: (imageUrl: string) => void;
}

const openai = new OpenAI({
  apiKey: openAiKey,
});

const DressGenerator: React.FC<DressGeneratorProps> = ({
  onImageGenerated,
  onSaveImage,
}) => {
  const colorScheme = useColorScheme();
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [info, setInfo] = useState<string>("");
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [dressName, setDressName] = useState<string>("");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const { generatePrompt, isLoading: isPromptLoading } =
    usePromptGenerator(openai);
  const {
    generateImage,
    predictionId: imagePredictionId,
    info: imageInfo,
  } = useImageGenerator();
  const {
    description,
    generateDescription,
    setDescription,
    isLoading: isDescriptionLoading,
  } = useUserFriendlyDescription();

  const generateAndTryOn = async () => {
    setIsLoading(true);
    setInfo("");
    try {
      setInfo("Generating...");
      const prompt = await generatePrompt(keywords);
      setDressName(
        `${
          keywords.split(" ")[0].charAt(0).toUpperCase() +
          keywords.split(" ")[0].slice(1)
        } Dream Dress`
      );

      // Generate user-friendly description
      await generateDescription(prompt);

      setInfo("Generating image...");
      await generateImage(prompt);
    } catch (error) {
      console.error("Error:", error);
      setInfo(`Error: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveImage = () => {
    if (result) {
      onSaveImage(result);
    }
  };

  const handleGenerateAnother = () => {
    onImageGenerated(result!);
    setResult(null);
    setDescription("");
    setIsGenerating(false);
    setKeywords("");
    setInfo("");
    setDressName("");
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  useEffect(() => {
    if (imagePredictionId) {
      setPredictionId(imagePredictionId);
      setInfo("Checking image generation status...");
    }
  }, [imagePredictionId]);

  useEffect(() => {
    const checkPrediction = async () => {
      if (!predictionId) return;

      try {
        const response = await fetch(
          `https://api.replicate.com/v1/predictions/${predictionId}`,
          {
            headers: {
              Authorization: `Token ${replicateToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data", data);

        if (data.status === "succeeded") {
          const imageUrl = data.output[0];
          setResult(imageUrl);
          setInfo("Success");
          setPredictionId(null);
          setIsGenerating(true);
        } else if (data.status === "failed") {
          setInfo("Error: Image generation failed");
          setPredictionId(null);
        } else {
          setTimeout(checkPrediction, 1000);
        }
      } catch (error) {
        console.error("Error checking prediction:", error);
        setInfo("Error: " + (error as Error).message);
        setPredictionId(null);
      }
    };

    if (predictionId) {
      checkPrediction();
    }
  }, [predictionId]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={[
          styles.container,
          colorScheme === "dark" && styles.darkContainer,
        ]}
      >
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        {!isGenerating ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, colorScheme === "dark" && styles.darkInput]}
              placeholder="Enter keywords..."
              placeholderTextColor={colorScheme === "dark" ? "#888" : "#999"}
              value={keywords}
              onChangeText={setKeywords}
            />
            <TouchableOpacity
              style={[
                styles.button,
                (!keywords.trim() || isLoading) && styles.buttonDisabled,
                colorScheme === "dark" && styles.darkButton,
              ]}
              onPress={generateAndTryOn}
              disabled={!keywords.trim() || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Generate</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.generateAnotherButton}
              onPress={handleGenerateAnother}
            >
              <Text style={styles.buttonText}>Generate Another</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveImage}
            >
              <Text style={[styles.buttonText, styles.saveButtonText]}>
                Save Image
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {info ? (
          <Text
            style={[styles.infoText, colorScheme === "dark" && styles.darkText]}
          >
            {info}
          </Text>
        ) : null}
        {dressName && (
          <Text
            style={[
              styles.dressName,
              colorScheme === "dark" && styles.darkText,
            ]}
          >
            {dressName}
          </Text>
        )}
        <View
          style={[
            styles.imageContainer,
            colorScheme === "dark" && styles.darkImageContainer,
          ]}
        >
          {result ? (
            <Image
              source={{ uri: result }}
              style={styles.image}
              contentFit="cover"
            />
          ) : (
            <Text
              style={[
                styles.placeholderText,
                colorScheme === "dark" && styles.darkPlaceholderText,
              ]}
            >
              No image generated yet
            </Text>
          )}
        </View>
        {description && (
          <TouchableOpacity onPress={toggleDescription}>
            <Text
              style={[
                styles.descriptionText,
                !isDescriptionExpanded && styles.descriptionCollapsed,
                colorScheme === "dark" && styles.darkText,
              ]}
              numberOfLines={isDescriptionExpanded ? undefined : 1}
            >
              {description}
            </Text>
            <Text
              style={[
                styles.expandCollapseText,
                colorScheme === "dark" && styles.darkExpandCollapseText,
              ]}
            >
              {isDescriptionExpanded ? "Show less" : "Show more"}
            </Text>
          </TouchableOpacity>
        )}
        <Text
          style={[styles.footer, colorScheme === "dark" && styles.darkText]}
        >
          {isGenerating
            ? "Click 'Generate Another' to create a new dress or 'Save Image' to keep this one"
            : "Enter keywords and tap 'Generate' to create a dress"}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkContainer: {
    // backgroundColor: "#1c1c1e",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
  },
  darkInput: {
    borderColor: "#444",
    color: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 4,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  darkButton: {
    backgroundColor: "#0A84FF",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  infoText: {
    color: "#666",
    marginBottom: 15,
  },
  darkText: {
    color: "#fff",
  },
  promptText: {
    color: "#333",
    marginTop: 15,
    marginBottom: 15,
    fontSize: 14,
    lineHeight: 20,
  },
  imageContainer: {
    aspectRatio: 1,
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  darkImageContainer: {
    backgroundColor: "#2c2c2e",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderText: {
    color: "#999",
  },
  darkPlaceholderText: {
    color: "#888",
  },
  footer: {
    textAlign: "center",
    color: "#666",
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  generateAnotherButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    borderRadius: 4,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#28A745",
    borderRadius: 4,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  saveButtonText: {
    fontWeight: "bold",
  },
  dressName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  descriptionText: {
    color: "#333",
    marginTop: 15,
    marginBottom: 5,
    fontSize: 14,
    lineHeight: 20,
  },
  descriptionCollapsed: {
    marginBottom: 0,
  },
  expandCollapseText: {
    color: "#007AFF",
    fontSize: 12,
    marginBottom: 15,
  },
  darkExpandCollapseText: {
    color: "#0A84FF",
  },
});

export default DressGenerator;
