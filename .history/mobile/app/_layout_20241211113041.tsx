import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import {
  useFonts,
  Quicksand_400Regular,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <StatusBar style="light"></StatusBar>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GluestackUIProvider>
  );
}
