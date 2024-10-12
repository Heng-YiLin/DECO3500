import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Importing the Ionicons for back button
import styles from "../styles/profileScreen.style";
import { getUserProfile, checkIfUsersAreBuddies, toggleBuddyRequest } from "../api/api"; // Import API calls
import AsyncStorage from '@react-native-async-storage/async-storage'; // For logged-in user ID

function ProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { Id } = route.params; // The profile user ID (user being viewed)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBuddy, setIsBuddy] = useState(false); // Track buddy status
  const [loggedInUserId, setLoggedInUserId] = useState(null); // Store the logged-in user ID

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserProfile(Id);
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBuddyStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("loggedInUser");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setLoggedInUserId(userData.id); // Set the logged-in user's ID
          const buddyStatus = await checkIfUsersAreBuddies(userData.id, Id); // Check buddy status
          setIsBuddy(buddyStatus); // Update the buddy status state
        }
      } catch (error) {
        console.error("Error fetching buddy status:", error);
      }
    };

    fetchUser();
    fetchBuddyStatus();
  }, [Id]);

  const handleToggleBuddy = async () => {
    const result = await toggleBuddyRequest(loggedInUserId, Id, isBuddy); // Toggle buddy request
    if (result) {
      setIsBuddy(!isBuddy); // Toggle buddy status in UI
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#407FDC" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>User not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Image source={require("../assets/images/profile.png")} style={styles.image} />

      <View style={styles.body}>
        <Text style={styles.title}>{user.name || "Unknown"}</Text>
        <Text style={styles.date}>{user.location || "Location not specified"}</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.agendaTitle}>Cultural Background</Text>
          <Text style={styles.description}>{user.background || "Not specified"}</Text>

          <Text style={styles.agendaTitle}>Languages Spoken</Text>
          <Text style={styles.description}>
            {user.languages ? user.languages.split(',').join('\n') : "Not specified"}
          </Text>

          <Text style={styles.agendaTitle}>Interests</Text>
          <Text style={styles.description}>
            {user.interests ? user.interests.split(',').join('\n') : "Not specified"}
          </Text>
        </View>
      </View>

      {/* Buddy Request Button */}
      <View style={styles.bodyBottom}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
              width: "100%",
            }}
            onPress={handleToggleBuddy}
          >
            <Text
              style={{
                color: "orange",
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              {isBuddy ? "Remove Buddy" : "Request Buddy"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ProfileScreen;
