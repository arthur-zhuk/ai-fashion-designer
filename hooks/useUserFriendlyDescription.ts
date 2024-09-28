import { useState } from "react";
import { openai } from "../utils/openai";

export const useUserFriendlyDescription = () => {
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateDescription = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that describes images in a user-friendly way.",
          },
          {
            role: "user",
            content: `Based on this image generation prompt, provide a brief, user-friendly description of what the garment might look like: "${prompt}"`,
          },
        ],
        max_tokens: 100,
      });

      const generatedDescription =
        response.choices[0].message.content || "No description available.";
      setDescription(generatedDescription);
      return generatedDescription;
    } catch (error) {
      console.error("Error generating user-friendly description:", error);
      setError("Unable to generate description.");
      return "Unable to generate description.";
    } finally {
      setIsLoading(false);
    }
  };

  return { description, generateDescription, setDescription, isLoading, error };
};
