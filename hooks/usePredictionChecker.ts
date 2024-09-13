import { useCallback } from "react";

export const usePredictionChecker = (apiToken: string) => {
  const checkPrediction = useCallback(
    async (predictionId: string) => {
      const response = await fetch(
        `https://api.replicate.com/v1/predictions/${predictionId}`,
        {
          headers: {
            Authorization: `Token ${apiToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    },
    [apiToken]
  );

  return { checkPrediction };
};
