import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#CFE1B9", // Tea Green for tab bar background
          // Dodavanje sjene za Android
          elevation: 8, // Viša vrijednost = jača sjena
          // Dodavanje sjene za iOS
          shadowColor: "#000", // Boja sjene
          shadowOffset: { width: 0, height: 3 }, // Pomak sjene
          shadowOpacity: 0.5, // Prozirnost sjene
          shadowRadius: 5, // Radijus sjene
        },
        tabBarActiveTintColor: "#718355", // Reseda Green for active icons and text
        tabBarInactiveTintColor: "#FFFFFF", // White for inactive icons and text
        headerStyle: {
          backgroundColor: "#CFE1B9", // Tea Green for the header background
        },
        headerTintColor: "#FFFFFF", // White for the header text
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
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
        name="Progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "bar-chart" : "bar-chart-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
