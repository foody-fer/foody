import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/CustomText";
import { Button } from "react-native";

export default function LogProgress() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Your Progress</Text>
      {/* Dodaj svoj UI za log progress ovdje */}
      <Button
        title="Submit Progress"
        onPress={() => alert("Progress Logged!")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
