import { Button, ButtonText } from "@/components/ui/button";
import { Text, View } from "react-native";
import { useFonts, Quicksand_400Regular } from "@expo-google-fonts/quicksand";
import { useRouter } from "expo-router";

export default function Index() {
  let fonts = useFonts({
    Quicksand_400Regular,
  });

  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-teagreen">
      <Button size="md" variant="solid" className="bg-jet">
        <ButtonText
          className="font-quicksand"
          onPress={() => router.push("/profile")}
        >
          Go to Profile
        </ButtonText>
      </Button>
    </View>
  );
}
