import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" />
      <Tab.Screen name="Profile" />
      <Tab.Screen name="Progress" />
    </Tab.Navigator>
  );
}
