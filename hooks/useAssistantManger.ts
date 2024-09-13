import { useState, useEffect } from "react";
import OpenAI from "openai";

const openAiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: openAiKey,
});

const createAssistant = async () => {
  const assistant = await openai.beta.assistants.create({
    name: "FLUX Prompt Wizard",
    instructions:
      "You are the FLUX Dress Designer, an AI assistant specialized in generating creative and detailed prompts for the black-forest-labs/flux-schnell image generation model, focusing specifically on dresses. Your task is to create vivid, descriptive prompts that will result in visually striking images of various dress styles, designs, and fashion concepts. Consider different dress types (e.g., cocktail, evening gown, sundress, wedding dress), fabrics (e.g., silk, lace, chiffon, velvet), patterns, colors, and design elements (e.g., necklines, sleeves, silhouettes). Also, incorporate different artistic styles or generation techniques (e.g., photorealistic, watercolor, sketch, haute couture fashion illustration) to provide diverse and engaging dress visualizations based on user input keywords.",
    model: "gpt-4o-mini",
  });
  return assistant.id;
};

export const useAssistant = () => {
  const [assistantId, setAssistantId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeAssistant = async () => {
      try {
        const id = await createAssistant();
        setAssistantId(id);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to create assistant")
        );
      } finally {
        setIsLoading(false);
      }
    };
    initializeAssistant();
  }, []);
  return { assistantId, isLoading, error };
};
