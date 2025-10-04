import React from "react";
import { Redirect, Tabs } from "expo-router";
import useAuthStore from "@/store/auth.store";
import { TabBarIconProps } from "@/type";
import { View, Text } from "react-native";
import cn from "clsx";

// Expo vector icons
import { Ionicons } from "@expo/vector-icons";

const TabBarIcon = ({ focused, iconName, title }: { focused: boolean; iconName: string; title: string }) => (
  <View className="tab-icon">
    <Ionicons
      name={iconName}
      size={18} // smaller icon size
      color={focused ? "#fe8c00" : "#5d5f6d"}
      style={{ marginBottom: 4 }} // small spacing from label
    />
    <Text
      className={cn(
        "text-xs font-semibold", // keep dynamic styling feel but smaller
        focused ? "text-primary" : "text-gray-200"
      )}
    >
      {title}
    </Text>
  </View>
);

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href="/SignIn" />;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          marginHorizontal: 20,
          height: 80,
          position: "absolute",
          bottom: 40,
          backgroundColor: "white",
          shadowColor: "#1a1a1a",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            // use filled icon when focused, outline when not
            <TabBarIcon title="Home" focused={focused} iconName={focused ? "home" : "home-outline"} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Search" focused={focused} iconName={focused ? "search" : "search-outline"} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            // cart icon: bag-outline vs bag
            <TabBarIcon title="Cart" focused={focused} iconName={focused ? "cart" : "cart-outline"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Profile" focused={focused} iconName={focused ? "person" : "person-outline"} />
          ),
        }}
      />
    </Tabs>
  );
}
