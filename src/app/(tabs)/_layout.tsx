import { theme } from "@/src/styles/theme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Add Alert",
          tabBarIcon: ({ color }) => <FontAwesome6 name="bell" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: "Watchlist",
          tabBarIcon: ({ color }) => <FontAwesome6 name="list" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="graph"
        options={{
          title: "Graph",
          tabBarIcon: ({ color }) => <MaterialIcons name="show-chart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Octicons name="gear" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
