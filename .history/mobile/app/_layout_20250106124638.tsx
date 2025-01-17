{
  /*import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <StatusBar style="light"></StatusBar>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="LogProgress" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GluestackUIProvider>
  );
}*/
}

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useEffect, useState } from "react";
import "@/global.css";

// Simuliraj provjeru autentikacije
const checkAuth = async () => {
  // Ovdje provjeri status prijave, npr. s AsyncStorage ili API-jem
  return new Promise((resolve) => setTimeout(() => resolve(false), 2000)); // Simulirano kašnjenje
};

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null dok traje provjera
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Provjeri je li korisnik prijavljen
    checkAuth().then((authStatus: boolean) => {
      setIsAuthenticated(authStatus);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    // Prikaži indikator učitavanja dok traje provjera
    return (
      <GluestackUIProvider mode="light">
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="loading" options={{ headerShown: false }} />
        </Stack>
      </GluestackUIProvider>
    );
  }

  return (
    <GluestackUIProvider mode="light">
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Ako korisnik nije prijavljen, prikaži Login ekran */}
        {!isAuthenticated ? (
          <Stack.Screen name="Login" options={{ headerShown: false }} />
        ) : (
          // Ako je korisnik prijavljen, prikaži glavnu aplikaciju
          <>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="LogProgress" options={{ headerShown: false }} />
          </>
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
    </GluestackUIProvider>
  );
}
