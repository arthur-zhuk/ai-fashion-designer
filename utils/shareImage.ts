import { Share } from "react-native";

interface ShareToPinterestProps {
  imageUrl: string | undefined;
  description: string;
}

export const handleShareToPinterest = async ({
  imageUrl,
  description,
}: ShareToPinterestProps) => {
  try {
    const result = await Share.share({
      message: description,
      url: imageUrl,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log("Shared with activity type:", result.activityType);
      } else {
        console.log("Shared successfully");
      }
    } else if (result.action === Share.dismissedAction) {
      console.log("Share dismissed");
    }
  } catch (error) {
    console.error("Error sharing to Pinterest:", error);
  }
};
