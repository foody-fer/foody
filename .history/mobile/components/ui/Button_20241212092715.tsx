import { Pressable } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { Text } from "./CustomText";

type Props = {
  label: string;
  size: "big" | "small" | "medium";
  onPress?: () => void;
};

export default function Button({}) {
  return (
    <View>
      <Pressable>
        <Text>{label}</Text>
      </Pressable>
    </View>
  );
}
