import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useRouter } from "expo-router";
import Purchases from "react-native-purchases";

interface UpgradeSectionProps {}

const UpgradeSection: React.FC<UpgradeSectionProps> = () => {
  const router = useRouter();
  const [isProUser, setIsProUser] = useState(false);

  useEffect(() => {
    checkProStatus();
  }, []);

  const checkProStatus = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      setIsProUser(customerInfo.entitlements.active["Couture"] !== undefined);
    } catch (error) {
      console.error("Error checking pro status:", error);
      setIsProUser(false);
    }
  };

  const handleUpgrade = () => router.push("/upgrade");

  if (isProUser) {
    return null; // Don't render anything if the user is already a Pro user
  }

  return (
    <View style={styles.upgradeSection}>
      <Text style={styles.upgradeText}>
        Get the highest quality image generation by upgrading now
      </Text>
      <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
        <Text style={styles.upgradeButtonText}>Upgrade to Pro</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpgradeSection;
