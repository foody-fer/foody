import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="Profile" />
      <Tabs.Screen name="Progress" />
    </Tabs>
  );
}
