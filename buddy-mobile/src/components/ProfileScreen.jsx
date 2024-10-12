import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for icons
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import styles from "../styles/profileScreen.style";
import { getUserProfile } from "../api/api";

function ProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // State to hold the Id (from params or async storage)
  const [loggedInUserId, setLoggedInUserId] = useState(null); // State to hold the logged-in user's ID

  // Fetch the userId either from route params or AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      let idFromParams = route.params?.Id;

      if (idFromParams) {
        setUserId(idFromParams);
      }

      try {
        const storedUser = await AsyncStorage.getItem("loggedInUser");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setLoggedInUserId(userData.id); // Set logged-in user's ID
          if (!idFromParams) {
            setUserId(userData.id); // Fallback to logged-in user's ID if no params
          }
        } else {
          console.error("No userId in route params or AsyncStorage");
        }
      } catch (error) {
        console.error("Error retrieving logged-in user from AsyncStorage:", error);
      }
    };

    fetchUserId();
  }, [route.params]);

  // Fetch the user profile based on the userId
  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const fetchedUser = await getUserProfile(userId);
          setUser(fetchedUser);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [userId]);

  // Logout function
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("loggedInUser"); // Clear logged-in user data
      navigation.replace("Login"); // Navigate back to the SignIn screen
    } catch (error) {
      console.error("Error logging out:", error);
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

      {/* Logout Button - Only visible if viewing own profile */}
      {loggedInUserId === userId && (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="exit-outline" size={24} color="white" />
        </TouchableOpacity>
      )}

      <Image source={require("../assets/images/profile.png")} style={styles.image} />

      <View style={styles.body}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{user.name || "Unknown"}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={32} color="gray" />
          <Text style={styles.location}>{user.location || "Location not specified"}</Text>
        </View>
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
    </View>
  );
}

export default ProfileScreen;
