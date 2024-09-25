import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Modal,
  Pressable,
  Platform,
  StatusBar,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { useState } from "react";
import { Animated } from "react-native";

const AnimatedImage = ({ source, style, onPress }) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.05,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulseAnimation).start();
  }, [scaleValue]);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.Image
        source={source}
        style={[style, { transform: [{ scale: scaleValue }] }]}
        resizeMode="cover"
      />
    </Pressable>
  );
};

export default function UpgradeScreen() {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleUpgrade = () => {
    // Implement actual upgrade logic here
    console.log("Upgrade confirmed");
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Elevate Your Style</Text>

          <View style={styles.imageContainer}>
            <AnimatedImage
              source={require("../assets/images/upsellDress.webp")}
              style={styles.upsellImage}
              onPress={() =>
                openImage(require("../assets/images/upsellDress.webp"))
              }
            />
            <AnimatedImage
              source={require("../assets/images/upsellDress2.webp")}
              style={styles.upsellImage}
              onPress={() =>
                openImage(require("../assets/images/upsellDress2.webp"))
              }
            />
          </View>

          <Text style={styles.feature}>🖼️ Premium Quality Designs</Text>
          <Text style={styles.description}>
            Unlock stunning, high-resolution garment designs that bring your
            fashion vision to life with exquisite detail.
          </Text>

          <Text style={styles.feature}>🎨 Exclusive Styles & Patterns</Text>
          <Text style={styles.description}>
            Access a curated collection of avant-garde styles and patterns, from
            haute couture to street chic, available only to Pro users.
          </Text>

          <Text style={styles.pricing}>
            Unlock all Pro features for just $9.99/month
          </Text>

          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={handleUpgrade}
          >
            <Text style={styles.upgradeButtonText}>Upgrade to Fashion Pro</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          {selectedImage && (
            <Image
              source={selectedImage}
              style={styles.enlargedImage}
              resizeMode="contain"
            />
          )}
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "300",
    marginBottom: 24,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "Helvetica Neue, sans-serif",
    letterSpacing: 1,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  upsellImage: {
    width: 160,
    height: 160,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D4AF37",
  },
  feature: {
    fontSize: 22,
    fontWeight: "500",
    marginTop: 24,
    marginBottom: 12,
    color: "#D4AF37",
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 24,
    color: "#E0E0E0",
    fontFamily: "Helvetica Neue, sans-serif",
  },
  pricing: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 32,
    marginBottom: 24,
    textAlign: "center",
    color: "#FFFFFF",
  },
  upgradeButton: {
    backgroundColor: "#D4AF37",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#D4AF37",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  upgradeButtonText: {
    color: "#1A1A1A",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  enlargedImage: {
    width: "90%",
    height: "70%",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#D4AF37",
  },
});
