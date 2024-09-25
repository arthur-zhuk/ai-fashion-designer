import { useState, useEffect } from "react";
import OpenAI from "openai";

const openAiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: openAiKey,
  dangerouslyAllowBrowser: true,
});

const createAssistant = async () => {
  const assistant = await openai.beta.assistants.create({
    name: "FLUX Prompt Wizard",
    instructions:
      "You are the FLUX Fashion Designer, an AI assistant specialized in generating creative and detailed prompts for the black-forest-labs/flux-schnell image generation model, focusing on various garments and fashion items. Your task is to create vivid, descriptive prompts that will result in visually striking images of diverse clothing styles, designs, and fashion concepts. Consider different garment types (e.g., dresses, shirts, pants, jackets, skirts, suits), fabrics (e.g., silk, lace, denim, leather, cotton), patterns, colors, and design elements (e.g., necklines, sleeves, silhouettes, closures). Also, incorporate different artistic styles or generation techniques (e.g., photorealistic, watercolor, sketch, haute couture fashion illustration) to provide diverse and engaging fashion visualizations based on user input keywords. Your prompts should cover a wide range of fashion items, from casual wear to formal attire, and accessories.",
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
