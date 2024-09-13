import { useState } from "react";

export const useImageGenerator = () => {
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const replicateToken = process.env.EXPO_PUBLIC_REPLICATE_API_TOKEN;
  const [info, setInfo] = useState<string>("");

  const generateImage = async (prompt: string) => {
    setInfo("Processing...");
    try {
      const response = await fetch(
        "https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${replicateToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input: { prompt } }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPredictionId(data.id);
      setInfo("Processing image...");
    } catch (error) {
      console.error("Error:", error);
      setInfo(`Error: ${(error as Error).message}`);
    }
  };

  return { generateImage, predictionId, info };
};
