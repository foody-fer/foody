import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

// Import your custom font (if using a self-hosted font or expo-google-fonts)
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// Define the custom theme
const customTheme = {
  fonts: {
    heading: "Roboto", // Replace "Roboto" with your desired font
    body: "Roboto",
    mono: "Courier New", // Example for monospace font
  },
  colors: {
    primary: "#007bff", // Customize colors if needed
  },
};

export default function RootLayout() {
  // Load fonts using Expo
  const [fontsLoaded] = useFonts({
    Roboto: require("@expo-google-fonts/roboto"), // Replace with your font
  });

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <GluestackUIProvider theme={customTheme} mode="light">
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="index" /> */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GluestackUIProvider>
  );
}
