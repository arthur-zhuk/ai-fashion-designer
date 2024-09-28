import { useState, useCallback, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Platform } from "react-native";

// Import Purchases conditionally
let Purchases: any;
if (Platform.OS !== "web") {
  Purchases = require("react-native-purchases").default;
}

// Mock Purchases object for web
const mockPurchases = {
  getCustomerInfo: async () => ({
    entitlements: { active: { Couture: false } },
  }),
};

// Use the appropriate Purchases object based on the platform
const PurchasesManager = Platform.OS === "web" ? mockPurchases : Purchases;

interface GenerateImageResult {
  imageUrl: string;
  info: string;
}

export const useImageGenerator = () => {
  const [info, setInfo] = useState<string>("");
  const [isProUser, setIsProUser] = useState(false);
  const queryClient = useQueryClient();

  const isDevelopment = process.env.NODE_ENV === "development";
  const API_URL = isDevelopment
    ? "http://localhost:3000/api/generate-image"
    : "https://your-production-api-url.com/api/generate-image";

  useEffect(() => {
    const checkProStatus = async () => {
      try {
        const customerInfo = await PurchasesManager.getCustomerInfo();
        setIsProUser(customerInfo.entitlements.active["Couture"] !== undefined);
      } catch (error) {
        console.error("Error checking pro status:", error);
        setIsProUser(false);
      }
    };

    checkProStatus();
  }, []);

  const generateImageMutation = useMutation<GenerateImageResult, Error, string>(
    {
      mutationFn: async (prompt: string): Promise<GenerateImageResult> => {
        setInfo("Starting image generation...");

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            isProUser,
            go_fast: true,
            num_outputs: 1,
            aspect_ratio: "1:1",
            output_format: "webp",
            output_quality: 80,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        let imageUrl;
        if (data.imageUrl) {
          imageUrl = data.imageUrl;
        } else if (
          data.output &&
          Array.isArray(data.output) &&
          data.output.length > 0
        ) {
          imageUrl = data.output[0];
        } else {
          throw new Error("No image URL received from the server");
        }

        setInfo("Image generation complete.");

        return {
          imageUrl,
          info: "Image generation complete.",
        };
      },
      onSuccess: (data) => {
        queryClient.setQueryData(["generatedImage"], data.imageUrl);
        queryClient.setQueryData<string[]>(
          ["generatedImages"],
          (oldImages = []) => [...oldImages, data.imageUrl]
        );
      },
      onError: (error) => {
        console.error("Error generating image:", error);
        setInfo("Error generating image.");
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

  const clearImage = useCallback(() => {
    queryClient.setQueryData(["generatedImage"], null);
  }, [queryClient]);

  const generateImage = useCallback(
    async (prompt: string) => {
      clearImage();
      const result = await generateImageMutation.mutateAsync(prompt);
      return result.imageUrl;
    },
    [clearImage, generateImageMutation]
  );

  return {
    generateImage,
    clearImage,
    isImageLoading,
    isPending: generateImageMutation.isPending,
    info,
    error: generateImageMutation.error?.message || null,
    generatedImages,
    generatedImage,
  };
};
