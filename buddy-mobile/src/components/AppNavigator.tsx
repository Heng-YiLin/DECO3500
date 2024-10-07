import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./HomeScreen"; // Import your main component
import Profile from "./ProfileScreen"; // Import your main component
import Form from "./FormScreen"; // Import your main component
import Buddy from "./BuddyScreen"; // Import your main component
import Calendar from "./CalendarScreen"; // Import your main component

import { Ionicons } from "@expo/vector-icons"; // If using Expo for icons

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Calendar") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Form") {
            iconName = focused ? "clipboard" : "clipboard-outline";
          } else if (route.name === "Buddy") {
            iconName = focused ? "people" : "people-outline";
          }

          // Return the icon component from Ionicons
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ff8c8c", // Customize active tab color
        tabBarInactiveTintColor: "gray", // Customize inactive tab color
        headerShown: false, // Hide the header
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Buddy" component={Buddy} />
      <Tab.Screen name="Form" component={Form} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
