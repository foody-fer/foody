import { Redirect, Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/api/auth";
import { Spinner } from "@/components/ui/spinner";
import { Touchable, TouchableOpacity, View } from "react-native";

export default function Layout() {
  const user = useAuth();
  const router = useRouter();

  if (user.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner size="large" />
      </View>
    );
  }

  if (!user.data) {
    return <Redirect href="/Login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#CFE1B9", // Tea Green for tab bar background
          elevation: 8, // Android shadow
          shadowColor: "#000", // iOS shadow
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
        },
        tabBarActiveTintColor: "#718355", // Reseda Green for active icons and text
        tabBarInactiveTintColor: "#FFFFFF", // White for inactive icons and text
        headerStyle: {
          backgroundColor: "#CFE1B9",
        },
        headerTintColor: "#FFFFFF", // White for the header text
        headerTitleStyle: {
          fontFamily: "Quicksand_700Bold", // Font for header title
          fontSize: 20,
        },
        tabBarLabelStyle: {
          fontFamily: "Quicksand_600Regular", // Font for tab labels
          fontSize: 13,
        },
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
      <Tabs.Screen
        name="Chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: "Meals",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/Meal-planner")}>
              <Ionicons name="settings" size={24} color="#4a5568" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "restaurant" : "restaurant-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
