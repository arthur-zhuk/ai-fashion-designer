import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { usePredictionChecker } from "./usePredictionChecker";

const replicateToken = process.env.EXPO_PUBLIC_REPLICATE_API_TOKEN || "";

interface GenerateImageResult {
  imageUrl: string;
  info: string;
}

export const useImageGenerator = () => {
  const [info, setInfo] = useState<string>("");
  const queryClient = useQueryClient();
  const { checkPrediction } = usePredictionChecker(replicateToken);

  const generateImageMutation = useMutation<GenerateImageResult, Error, string>(
    {
      mutationFn: async (prompt: string): Promise<GenerateImageResult> => {
        setInfo("Starting image generation...");

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
        const predictionId = data.id;
        setInfo("Image is being generated...");

        // Poll for prediction status
        return new Promise((resolve, reject) => {
          const pollInterval = setInterval(async () => {
            try {
              const prediction = await checkPrediction(predictionId);
              if (prediction.status === "succeeded") {
                const outputUrl = Array.isArray(prediction.output)
                  ? prediction.output[0]
                  : prediction.output;
                setInfo("Image generation complete.");
                clearInterval(pollInterval);
                resolve({
                  imageUrl: outputUrl,
                  info: "Image generation complete.",
                });
              } else if (prediction.status === "failed") {
                setInfo("Image generation failed.");
                clearInterval(pollInterval);
                reject(new Error("Image generation failed"));
              } else {
                setInfo(`Image generation status: ${prediction.status}`);
              }
            } catch (pollError) {
              console.error("Error polling prediction status:", pollError);
              setInfo("Error checking image status.");
              clearInterval(pollInterval);
              reject(pollError);
            }
          }, 2000); // Poll every 2 seconds
        });
      },
      onError: (error) => {
        console.error("Error generating image:", error);
        setInfo("Error generating image.");
      },
      onSuccess: (data) => {
        queryClient.setQueryData(["generatedImage"], data.imageUrl);
        queryClient.setQueryData<string[]>(
          ["generatedImages"],
          (oldImages = []) => [...oldImages, data.imageUrl]
        );
      },
    }
  );

  const { data: generatedImages = [] } = useQuery<string[]>({
    queryKey: ["generatedImages"],
    enabled: false,
  });

  const { data: generatedImage, isLoading: isImageLoading } = useQuery<string>({
    queryKey: ["generatedImage"],
    enabled: false,
  });

  return {
    generateImage: generateImageMutation.mutate,
    isImageLoading,
    isPending: generateImageMutation.isPending,
    info,
    error: generateImageMutation.error?.message || null,
    generatedImages,
    generatedImage,
  };
};
