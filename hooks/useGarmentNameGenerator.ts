import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { openai } from "@/utils/openai";

export const useGarmentNameGenerator = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (description: string) => {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a creative fashion designer assistant. Generate a catchy and unique name for a garment based on its description.",
          },
          {
            role: "user",
            content: `Generate a name for this garment: ${description}`,
          },
        ],
        max_tokens: 30,
      });

      return response.choices[0]?.message?.content?.trim() || "Unnamed Garment";
    },
    onSuccess: (data) => {
      console.log("Garment name generated:", data);
      queryClient.setQueryData(["garmentName"], data);
    },
  });

  const { data: garmentName, isLoading: isGarmentNameLoading } =
    useQuery<string>({
      queryKey: ["garmentName"],
      enabled: false,
    });

  return { mutation, garmentName, isGarmentNameLoading };
};
