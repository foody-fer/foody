import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

const FloatingChatButton = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  const handleChatPress = () => {
    router.push("/Chat"); // Replace with your chat screen route
  };

  // Don't render the button if on the Chat screen
  if (pathname === "/Chat" || pathname === "/Login") {
    return null;
  }

  return (
    <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
      <Ionicons name="chatbubble-ellipses" size={28} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View style={{ flex: 1 }}>
      {children}
      <FloatingChatButton />
    </View>
  );
}

const styles = StyleSheet.create({
  chatButton: {
    position: "absolute",
    bottom: 100, // Adjust to appear above the tab bar
    right: 20,
    backgroundColor: "#575A4B",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});
