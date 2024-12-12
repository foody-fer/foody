import { Pressable, StyleSheet } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { Text } from "./CustomText";

type Props = {
  label: string;
  size: "big" | "small" | "medium";
  onPress?: () => void;
};

export default function Button({ label, size, onPress }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 50,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
