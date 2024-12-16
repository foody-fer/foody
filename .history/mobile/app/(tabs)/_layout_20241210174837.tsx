import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#718355", // Reseda Green when active
        tabBarInactiveTintColor: "#FFFFFF", // White when inactive
        headerStyle: {
          backgroundColor: "#CFE1B9", // Tea Green background for header
        },
        headerTintColor: "#FFFFFF", // White text in header
        tabBarStyle: {
          backgroundColor: "#CFE1B9", // Tea Green background for navbar
        },
        tabBarIconStyle: {
          marginBottom: 2, // Optional: Adjust icon positioning
        },
        tabBarLabelStyle: {
          fontSize: 12, // Optional: Adjust font size
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Sticker Smash",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
