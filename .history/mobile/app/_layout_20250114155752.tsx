import { Stack, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { AuthProvider, useAuth } from "@/authContext";

const AuthenticatedLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/Login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="LogProgress" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <GluestackUIProvider mode="light">
        <StatusBar style="light" />
        <AuthenticatedLayout />
      </GluestackUIProvider>
    </AuthProvider>
  );
}
