import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import { useRouter } from "expo-router";

export default function PaywallScreen() {
  const { currentOffering, isLoading, error, purchasePackage } =
    useRevenueCat();
  const [selectedPlan, setSelectedPlan] = useState("");
  const router = useRouter();
  const colorScheme = useColorScheme();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading offerings...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!currentOffering) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorText}>
          No offerings available. Please try again later.
        </Text>
      </SafeAreaView>
    );
  }

  const handlePurchase = async () => {
    if (selectedPlan) {
      const packageToPurchase = currentOffering.availablePackages.find(
        (pkg) => pkg.identifier === selectedPlan
      );
      if (packageToPurchase) {
        try {
          await purchasePackage(packageToPurchase);
          router.replace("/");
        } catch (error) {
          console.error("Purchase failed:", error);
        }
      }
    }
  };

  const handleDismiss = () => {
    console.log("Dismiss button clicked");
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/paywall1.webp")}
        style={styles.backgroundImage}
      />
      <View
        style={[styles.overlay, colorScheme === "dark" && styles.darkOverlay]}
      >
        <TouchableOpacity style={styles.closeButton} onPress={handleDismiss}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <Text style={[styles.title, colorScheme === "dark" && styles.darkText]}>
          Elevate Your Style with Exclusive Designs
        </Text>
        <View style={styles.planContainer}>
          {currentOffering.availablePackages.map((pkg) => (
            <TouchableOpacity
              key={pkg.identifier}
              style={[
                styles.planBox,
                selectedPlan === pkg.identifier && styles.selectedPlan,
              ]}
              onPress={() => setSelectedPlan(pkg.identifier)}
            >
              <Text
                style={[
                  styles.duration,
                  selectedPlan === pkg.identifier && styles.selectedText,
                ]}
              >
                {pkg.identifier}
              </Text>
              <Text
                style={[
                  styles.price,
                  selectedPlan === pkg.identifier && styles.selectedText,
                ]}
              >
                {pkg.product.priceString}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text
          style={[
            styles.fullAccessText,
            colorScheme === "dark" && styles.darkText,
          ]}
        >
          Full access to all premium designs
        </Text>
        <TouchableOpacity style={styles.unlockButton} onPress={handlePurchase}>
          <Text style={styles.unlockButtonText}>
            Unlock Your Exclusive Designs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dismissButton} onPress={handleDismiss}>
          <Text style={styles.dismissButtonText}>Maybe Later</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text
            style={[
              styles.footerText,
              colorScheme === "dark" && styles.darkText,
            ]}
          >
            Terms of Service
          </Text>
          <Text
            style={[
              styles.footerText,
              colorScheme === "dark" && styles.darkText,
            ]}
          >
            Privacy Policy
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.4)", // Changed from 0.6 to 0.4
    justifyContent: "flex-end",
    padding: 20,
  },
  darkOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Changed from 0.6 to 0.4
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E0E3E",
    textAlign: "center",
    marginBottom: 20,
  },
  darkText: {
    color: "#F0F0F0",
  },
  planContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  planBox: {
    width: "30%",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  selectedPlan: {
    backgroundColor: "#FF85B3",
  },
  duration: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E0E3E",
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E0E3E",
  },
  selectedText: {
    color: "white",
  },
  fullAccessText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
    color: "#1E0E3E",
  },
  unlockButton: {
    backgroundColor: "#FF85B3",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  unlockButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#1E0E3E",
    marginHorizontal: 5,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#333",
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 20, // Increased from 10 to 20
    zIndex: 1, // Ensure it's above other elements
  },
  closeButtonText: {
    fontSize: 20,
    color: "#1E0E3E",
    fontWeight: "bold",
  },
  dismissButton: {
    marginTop: 10,
    padding: 20, // Increased from 10 to 20
  },
  dismissButtonText: {
    color: "#1E0E3E",
    textAlign: "center",
    fontSize: 16,
  },
});
