import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useImageGenerator } from "@/hooks/useImageGenerator";
import { useSaveImage } from "@/hooks/useSaveImage";
import { useThemeColor } from "@/hooks/useThemeColor";
import { createStyles } from "./styles";

interface GeneratedImagesGalleryProps {}

const GeneratedImagesGallery: React.FC<GeneratedImagesGalleryProps> = ({}) => {
  const { theme } = useThemeColor();
  const styles = createStyles(theme);

  const { generatedImages } = useImageGenerator();
  const saveImage = useSaveImage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const openImage = (image: string) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  if (!generatedImages || generatedImages.length === 0) {
    return null;
  }

  return (
    <View>
      <Text style={styles.sectionTitle}>Generated Images</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {generatedImages.map((url, index) => {
          return (
            <View key={index} style={styles.generatedImageContainer}>
              <TouchableOpacity onPress={() => openImage(url)}>
                <Image
                  source={{ uri: url }}
                  style={styles.thumbnailImage}
                  onError={(e) =>
                    console.log(
                      `Error loading image ${index}:`,
                      e.nativeEvent.error
                    )
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => saveImage.mutate(url)}
              >
                <Ionicons name="download-outline" size={24} color="#D4AF37" />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImage}
      >
        <Pressable style={styles.modalOverlay} onPress={closeImage}>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.enlargedImage}
            />
          )}
        </Pressable>
      </Modal>
    </View>
  );
};

export default GeneratedImagesGallery;
