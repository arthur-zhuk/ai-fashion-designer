import { useState } from "react";
import OpenAI from "openai";
import { useAssistant } from "@/hooks/useAssistantManger";

export const usePromptGenerator = (openai: OpenAI) => {
  const [isLoading, setIsLoading] = useState(false);
  const { assistantId } = useAssistant();

  const generatePrompt = async (keywords: string) => {
    setIsLoading(true);
    try {
      const thread = await openai.beta.threads.create();

      await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: `Generate a concise prompt for the black-forest-labs/flux-schnell image model using these keywords: ${keywords}. Focus on key visual elements and style. Keep it brief but vivid.`,
      });

      if (!assistantId) {
        throw new Error("Assistant ID is not available");
      }

      const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistantId,
      });

      // Wait for the run to complete
      let runStatus = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );
      while (runStatus.status !== "completed") {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      }

      const messages = await openai.beta.threads.messages.list(thread.id);

      const lastMessage = messages.data
        .filter((message) => message.role === "assistant")
        .pop();

      return (
        (lastMessage?.content[0] as { text: { value: string } })?.text?.value ||
        "Failed to generate prompt"
      );
    } catch (error) {
      console.error("Error generating prompt:", error);
      return "Error generating prompt";
    } finally {
      setIsLoading(false);
    }
  };

  return { generatePrompt, isLoading };
};
