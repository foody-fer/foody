import { queryClient } from "@/api/index";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="sign-in" />
          <Stack.Screen name="MealConfig" />
          <Stack.Screen name="sign-up" />
          <Stack.Screen name="Chat" />
          <Stack.Screen name="New-chat" />
          <Stack.Screen name="EditGroup" />
          <Stack.Screen name="ViewMembers" />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
