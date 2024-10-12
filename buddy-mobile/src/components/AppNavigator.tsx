import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./HomeScreen";
import Profile from "./ProfileScreen";
import Form from "./FormScreen";
import Buddy from "./BuddyScreen";
import Calendar from "./CalendarScreen";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import SignInScreen from "./SignInScreen";
import EventScreen from './EventScreen'; // Your EventScreen component
import Forum from './Forum';
import SignUpScreen from "./SignUpScreen";
import ProfileScreen from "./ProfileScreen"


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create a Tab Navigator for the main app
function MainTabs() {
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
            iconName = focused ? "chatbox-outline" : "chatbox-outline";
          } else if (route.name === "Buddy") {
            iconName = focused ? "people" : "people-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused }) => {
          return focused ? (
            <Text style={{ color: "#E48022", fontSize: 10 }}>
              {route.name}
            </Text>
          ) : null;
        },
        tabBarActiveTintColor: "#E48022",
        tabBarInactiveTintColor: "black",
        headerShown: false,
        tabBarStyle: { padding: 10, backgroundColor: "#F5F5F5" },
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

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = false; // Change this with your actual login status
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Show Login screen if not logged in */}
        <Stack.Screen
          name="Login"
          component={SignInScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventScreen"
          component={EventScreen}
          options={{ title: 'Event Details', headerShown: false }} // Optionally add a title
        />
        <Stack.Screen
          name="Forum"
          component={Forum}
          options={{ title: 'Forum', headerShown: false }} // Optionally add a title
        />
         <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ title: 'ProfileScreen', headerShown: false }} // Optionally add a title
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
