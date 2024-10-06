import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native'; // Import necessary components
import React from 'react';

export default function RootLayout() {
  return (
    <Tabs 
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'purple', // Active color
        tabBarInactiveTintColor: 'black', // Inactive color
        tabBarStyle: {
          paddingBottom: 20,
          paddingTop:10,
          height: 80, // Adjust height for icon and label alignment
          backgroundColor: 'white', // White background for the bar
        },
        tabBarLabel: ({ focused }) => {
          let label;
          switch (route.name) {
            case 'index':
              label = 'Home';
              break;
            case 'calendar':
              label = 'Calendar';
              break;
            case 'buddy':
              label = 'Buddy';
              break;
            case 'form':
              label = 'Messages';
              break;
            case 'profile':
              label = 'Profile';
              break;
          }
          // Return label in <Text> component when focused
          return focused ? <Text style={{ color: 'purple', marginLeft: 8 }}>{label}</Text> : null;
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName;

          // Set the icon name based on the route
          switch (route.name) {
            case 'index':
              iconName = 'home';
              break;
            case 'calendar':
              iconName = 'calendar';
              break;
            case 'buddy':
              iconName = 'users';
              break;
            case 'form':
              iconName = 'message-square';
              break;
            case 'profile':
              iconName = 'user';
              break;
          }

          // Wrap icon and label in a horizontal View for alignment
          return (
            <View
              style={{
                flexDirection: 'row', // Align icon and text horizontally
                alignItems: 'center', // Center them vertically
                backgroundColor: focused ? 'rgba(128, 0, 128, 0.1)' : 'transparent', // Purple background when focused
                padding: 10,
                borderRadius: 20, // Make the background rounded
              }}
            >
              <Feather name={iconName} size={28} color={color} />
              {/* Show label to the right of the icon */}
              {focused && (
                <Text style={{ color: 'purple', marginLeft: 8 }}>{route.name}</Text>
              )}
            </View>
          );
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="buddy"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="users" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="form"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="message-square" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
