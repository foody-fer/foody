import { queryClient } from "@/api";
import { AuthProvider } from "@/authContext";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GluestackUIProvider mode="light">
          <StatusBar style="light" />
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
    </QueryClientProvider>
  );
}
