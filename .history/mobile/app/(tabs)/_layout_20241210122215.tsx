import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./tabs/Home";
import Profile from "./tabs/Profile";
import Settings from "./tabs/Progress";

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Progress" component={Progress} />
    </Tab.Navigator>
  );
}
