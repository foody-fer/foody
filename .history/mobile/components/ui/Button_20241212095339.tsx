import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { Text } from "./CustomText";

type Props = {
  label: string;
  size: "big" | "small" | "medium";
  onPress?: () => void;
};

export default function Button({ label, size, onPress }: Props) {
  // Determine the style dynamically based on size
  const getButtonSizeStyle = (): ViewStyle => {
    switch (size) {
      case "big":
        return {
          width: 320,
          height: 68,
        };
      case "medium":
        return {
          width: 240,
          height: 54,
        };
      case "small":
        return {
          width: 160,
          height: 40,
        };
      default:
        return {};
    }
  };

  return (
    <View style={[styles.buttonContainer, getButtonSizeStyle()]}>
      {" "}
      {/* Apply dynamic size */}
      <Pressable
        style={[styles.button, getButtonSizeStyle()]}
        onPress={onPress}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#718355",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
