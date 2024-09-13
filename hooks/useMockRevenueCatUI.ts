import { Alert } from "react-native";

export const PAYWALL_RESULT = {
  PURCHASED: "PURCHASED",
  RESTORED: "RESTORED",
  CANCELLED: "CANCELLED",
  ERROR: "ERROR",
  NOT_PRESENTED: "NOT_PRESENTED",
};

export const RevenueCatUI = {
  presentPaywall: async () => {
    return new Promise((resolve) => {
      Alert.alert(
        "Mock Paywall",
        "This is a mock paywall. In a real app, this would show the RevenueCat paywall.",
        [
          {
            text: "Purchase",
            onPress: () => resolve(PAYWALL_RESULT.PURCHASED),
          },
          {
            text: "Cancel",
            onPress: () => resolve(PAYWALL_RESULT.CANCELLED),
            style: "cancel",
          },
        ]
      );
    });
  },
};

export const useRevenueCat = () => {
  return {
    customerInfo: {
      // Add mock customer info here
      entitlements: {
        active: {},
      },
    },
  };
};

// Remove this line
// export default RevenueCatUI;
