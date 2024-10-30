import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import { Package, PackageOpen, Settings, Truck, User } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Pending",
          tabBarIcon: ({ color, focused }) => (
            <PackageOpen size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reserved"
        options={{
          title: "Reserved",
          tabBarIcon: ({ color }) => <Truck size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="closed"
        options={{
          title: "Closed",
          tabBarIcon: ({ color, focused }) => (
            <Package size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Settings size={25} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
