import { Stack, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { AuthProvider, useAuth } from "@/authContext"; // Import AuthProvider and useAuth

// A wrapper for managing authenticated and unauthenticated layouts
const AuthenticatedLayout = () => {
  const { isAuthenticated } = useAuth(); // Get auth state

  if (!isAuthenticated) {
    // Redirect unauthenticated users to Login
    return <Redirect href="/Login" />;
  }

  // Render authenticated app layout
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
