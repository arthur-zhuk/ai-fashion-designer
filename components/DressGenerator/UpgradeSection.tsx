import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useRouter } from "expo-router";

interface UpgradeSectionProps {}

const UpgradeSection: React.FC<UpgradeSectionProps> = () => {
  const router = useRouter();
  const handleUpgrade = () => router.push("/upgrade");

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
