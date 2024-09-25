import React from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
import DressGenerator from "../../components/DressGenerator";

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <DressGenerator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === "ios" ? "#1c1c1e" : "#f8f8f8",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
