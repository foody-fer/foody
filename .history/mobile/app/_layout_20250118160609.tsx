import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { AuthProvider } from "@/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <GluestackUIProvider mode="light">
        <StatusBar style="light" />
        {/* Ensure Slot is rendered */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="LogProgress" options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="sign-in" />
          <Stack.Screen name="sign-up" />
        </Stack>
      </GluestackUIProvider>
    </AuthProvider>
  );
}
