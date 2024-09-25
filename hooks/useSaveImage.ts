import { useCallback } from "react";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import { useMutation } from "@tanstack/react-query";

const saveImage = async (imageUrl: string | string[]) => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission not granted");
  }

  const url = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;
  const fileUri = FileSystem.documentDirectory + "temp_image.jpg";
  const downloadResult = await FileSystem.downloadAsync(url, fileUri);

  if (downloadResult.status !== 200) {
    throw new Error("Failed to download image");
  }

  const asset = await MediaLibrary.createAssetAsync(fileUri);
  await MediaLibrary.createAlbumAsync("DressDesigner", asset, false);
  await FileSystem.deleteAsync(fileUri);
};

export const useSaveImage = () => {
  return useMutation({
    mutationFn: async (imageUrl: string | string[]) => saveImage(imageUrl),
    onSuccess: () => {
      Alert.alert("Success", "Image saved to gallery!");
    },
    onError: (error) => {
      console.error("Error saving image:", error);
      Alert.alert("Error", "Failed to save image. Please try again.");
    },
  });
};
