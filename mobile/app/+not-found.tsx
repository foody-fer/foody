import { View } from "react-native";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <View className="flex-1 bg-[#CFE1B9] items-center justify-center">
      <Stack.Screen options={{ title: "Oops! Not found!" }} />
      <Link
        href="/sign-up"
        className="text-white text-[35px] no-underline bg-[#718355] px-10 py-5 rounded-full"
      >
        Go back to the home screen
      </Link>
    </View>
  );
}
