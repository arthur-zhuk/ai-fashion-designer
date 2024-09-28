import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  View,
  Platform,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";

// Import Purchases conditionally
let Purchases: any;
if (Platform.OS !== "web") {
  Purchases = require("react-native-purchases").default;
}

// Mock Purchases object for web
const mockPurchases = {
  getCustomerInfo: async () => ({
    entitlements: { active: { Couture: false } },
  }),
};

// Use the appropriate Purchases object based on the platform
const PurchasesManager = Platform.OS === "web" ? mockPurchases : Purchases;

export default function TabLayout() {
  const router = useRouter();
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.05,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulseAnimation, { iterations: 15 }).start();

    // Check subscription status
    const checkSubscription = async () => {
      try {
        const purchaserInfo = await PurchasesManager.getCustomerInfo();
        const coutureEntitlement = purchaserInfo.entitlements.active.Couture;
        setIsPro(!!coutureEntitlement);
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
    };

    checkSubscription();
  }, []);

  return (
    <Tabs screenOptions={{ tabBarStyle: { display: "none" } }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "AI Fashion Creator",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
          headerRight: () => (
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              {isPro ? (
                <View
                  style={{
                    marginRight: 15,
                    backgroundColor: "#FFD700",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 18, marginRight: 4 }}>👑</Text>
                  <Text
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: 14,
                      marginLeft: 4,
                    }}
                  >
                    Pro User
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    router.push("/upgrade");
                  }}
                  style={{
                    marginRight: 15,
                    backgroundColor: "#FFD700",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 18, marginRight: 4 }}>👗</Text>
                  <Text
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: 14,
                      marginLeft: 4,
                    }}
                  >
                    Upgrade
                  </Text>
                </TouchableOpacity>
              )}
            </Animated.View>
          ),
        }}
      />
    </Tabs>
  );
}
