import React from "react";
import { StyleSheet, View } from "react-native";
import DressGenerator from "../../components/DressGenerator";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <DressGenerator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
});
