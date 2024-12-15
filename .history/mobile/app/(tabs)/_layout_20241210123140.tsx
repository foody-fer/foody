import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <Tabs>
      <Tab.Screen name="index" />
      <Tab.Screen name="Profile" />
      <Tab.Screen name="Progress" />
    </Tabs>
  );
}
