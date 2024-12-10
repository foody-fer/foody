import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <StatusBar style="light"></StatusBar>
      <Stack screenOptions={{ headerShown: false }}>
        {/*<Stack.Screen name="index" />*/}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GluestackUIProvider>
  );
}
