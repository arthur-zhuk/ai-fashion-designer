import React from "react";
import { View, StyleSheet } from "react-native";

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#3A3A3A",
    marginVertical: 20,
  },
});

export default Separator;
