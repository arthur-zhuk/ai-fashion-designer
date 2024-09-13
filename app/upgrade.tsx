import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Modal, Pressable } from "react-native";
import { useState } from "react";
import { Animated } from "react-native";

const AnimatedImage = ({ source, style, onPress }) => {
  const scaleValue = new Animated.Value(1);

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
  }, []);

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

          <Text style={styles.title}>Upgrade to Pro</Text>

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

          <Text style={styles.feature}>🖼️ Higher Quality Images</Text>
          <Text style={styles.description}>
            Unlock stunning, high-resolution dress designs that bring your
            vision to life with incredible detail.
          </Text>

          {/* <Text style={styles.feature}>🚀 Faster Generation</Text>
          <Text style={styles.description}>
            Create your dream dresses in seconds with our enhanced AI-powered
            generation engine.
          </Text> */}

          {/* <Text style={styles.feature}>💾 Unlimited Saves</Text>
          <Text style={styles.description}>
            Keep all your favorite designs forever with unlimited cloud storage.
          </Text> */}

          <Text style={styles.feature}>🎨 Exclusive Styles</Text>
          <Text style={styles.description}>
            Access a premium collection of styles and patterns only available to
            Pro users.
          </Text>

          <Text style={styles.pricing}>
            Unlock all Pro features for just $9.99/month
          </Text>

          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={handleUpgrade}
          >
            <Text style={styles.upgradeButtonText}>
              Give me better dresses now!
            </Text>
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
    backgroundColor: "#f0f0f0",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  topUpgradeButton: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 30,
  },
  topUpgradeButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  feature: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
  },
  pricing: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  upgradeButton: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  upgradeButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  upsellImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  enlargedImage: {
    width: "90%",
    height: "90%",
  },
});
