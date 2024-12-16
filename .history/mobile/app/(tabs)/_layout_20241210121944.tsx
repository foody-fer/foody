import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./tabs/Home";
import Profile from "./tabs/Profile";
import Settings from "./tabs/Settings";

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
