import React, { useEffect, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons"; // If using Expo for icons
import styles from "../styles/buddyScreen.style";
import { Button } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import async storage for retrieving loggedInUser
import { getBuddies, getAllUsers, getSameCulturalBackgroundUsers, getSameLanguageUsers } from "../api/api"; // Import API calls
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

// Helper function to filter out duplicates
const removeDuplicates = (arr) => {
  return [...new Set(arr)]; // Use Set to remove duplicates and return a unique array
};

// Profile Section Component
const ProfileSection = ({ title, profiles, users }) => {
  const navigation = useNavigation();

  // Filter valid profiles (users that are found in the `users` array)
  const validProfiles = profiles
    .map((id) => users.find((user) => user.id === id))
    .filter((user) => user); // Remove undefined values

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {validProfiles.length > 0 ? (
        <FlatList
          data={validProfiles} // Use valid profiles
          renderItem={({ item }) =>
            item ? ( // Check if item exists
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => navigation.navigate("ProfileScreen", { Id: item.id })} // Navigate to ProfileScreen
              >
                <Ionicons name="person-circle-outline" size={40} color="#1F3A6E" />
                {/* Display only the first name */}
                <Text style={styles.profileName}>{item.name.split(' ')[0]}</Text>
              </TouchableOpacity>
            ) : null
          }
          keyExtractor={(item) => (item ? item.id.toString() : Math.random().toString())} // Guard against undefined
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.profiles}
        />
      ) : (
        <Text style={styles.noUsersFoundText}>No users found.</Text> // Display this if no valid profiles
      )}
    </View>
  );
};

const BuddyScreen = () => {
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [loggedInUserBackground, setLoggedInUserBackground] = useState(null); // Store the logged-in user's background
  const [loggedInUserLanguages, setLoggedInUserLanguages] = useState([]); // Store the logged-in user's languages
  const [buddies, setBuddies] = useState([]);
  const [users, setUsers] = useState([]);
  const [sameCulturalBackground, setSameCulturalBackground] = useState([]);
  const [sameLanguage, setSameLanguage] = useState([]);
  const [nearby, setNearby] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  // States to control visibility of blue boxes
  const [showLocationBox, setShowLocationBox] = useState(true);
  const [showExpandReachBox, setShowExpandReachBox] = useState(true);

  // Function to fetch buddies and users
  const fetchBuddiesAndUsers = async () => {
    try {
      if (loggedInUserId) {
        setLoading(true); // Set loading to true when fetching data

        // Fetch buddies for the logged-in user
        const fetchedBuddies = await getBuddies(loggedInUserId);
        console.log("Fetched Buddies:", fetchedBuddies);

        // Fetch all users to map profiles to buddy IDs
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);

        // Identify valid buddies where logged-in user is user1_id
        const validBuddies = fetchedBuddies
          .filter((buddy) => buddy.user1_id === loggedInUserId)
          .map((buddy) => buddy.user2_id);

        const uniqueBuddies = removeDuplicates(validBuddies);

        console.log("Unique Buddies:", uniqueBuddies);
        setBuddies(uniqueBuddies);

        // Fetch users with the same cultural background (who are not buddies)
        if (loggedInUserBackground) {
          const sameBackgroundUsers = await getSameCulturalBackgroundUsers(loggedInUserBackground);
          const filteredBackgroundUsers = sameBackgroundUsers
            .filter(
              (user) => user.id !== loggedInUserId && !uniqueBuddies.includes(user.id)
            ); // Exclude the logged-in user and existing buddies

          setSameCulturalBackground(filteredBackgroundUsers.map(user => user.id)); // Extract only the user IDs
        }

        // Fetch users with the same language (who are not buddies)
        if (loggedInUserLanguages.length > 0) {
          const sameLanguageUsers = await getSameLanguageUsers(loggedInUserLanguages);
          const filteredLanguageUsers = sameLanguageUsers
            .filter(
              (user) => user.id !== loggedInUserId && !uniqueBuddies.includes(user.id)
            ); // Exclude the logged-in user and existing buddies

          setSameLanguage(filteredLanguageUsers.map(user => user.id)); // Extract only the user IDs
        }

        // For now, placeholders for other categories (actual logic to be added later)
        setNearby([]); // Placeholder for nearby logic
        setLoading(false); // Stop loading once data is fetched
      }
    } catch (error) {
      console.error("Error fetching buddies or users:", error);
      setLoading(false); // Stop loading in case of error
    }
  };

  // Fetch logged-in user ID, background, and languages from AsyncStorage
  useEffect(() => {
    const fetchLoggedInUserId = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("loggedInUser");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setLoggedInUserId(userData.id); // Set the loggedInUser ID
          setLoggedInUserBackground(userData.background); // Set the loggedInUser background
          setLoggedInUserLanguages(userData.languages ? userData.languages.split(", ") : []); // Set the loggedInUser languages
        }
      } catch (error) {
        console.error("Error retrieving logged-in user:", error);
      }
    };
    fetchLoggedInUserId();
  }, []);

  // Automatically fetch buddies and users when the screen is focused
  useFocusEffect(
    useCallback(() => {
      if (loggedInUserId) {
        fetchBuddiesAndUsers();
      }
    }, [loggedInUserId, loggedInUserBackground, loggedInUserLanguages]) // Add dependencies to re-fetch when user ID, background, or languages change
  );

  // Manually refresh all categories when the refresh button is pressed
  const handleRefresh = () => {
    fetchBuddiesAndUsers(); // Re-fetch all categories when refreshing
  };

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Buddies</Text>
      <View style={styles.bodyContainer}>
        {/* Nearby Available Buddy Section */}
        {showLocationBox && (
          <View style={styles.card}>
            <Text style={[styles.sectionTitle, { padding: 5 }]}>
              Nearby Available Buddy
            </Text>
            <Text style={[styles.sectionTitle, { padding: 5, paddingBottom: 20 }]}>
              Turn on location services
            </Text>
            <Button
              buttonColor="#407FDC"
              textColor="#FFFFFF"
              mode="elevated"
              labelStyle={{ fontWeight: "bold" }}
              onPress={() => setShowLocationBox(false)} // Hide the box when clicked
            >
              Turn on Location
            </Button>
          </View>
        )}

        {/* Loading Indicator */}
        {loading && (
          <ActivityIndicator size="large" color="#407FDC" />
        )}

        {/* Refresh Button */}
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
          <Ionicons name="refresh" size={32} color="#407FDC" />
        </TouchableOpacity>

        {/* Your Buddies Section */}
        {!loading && (
          <>
            <ProfileSection title="Your Buddies" profiles={buddies} users={users} />
          </>
        )}

        {/* Same Cultural Background Section */}
        <ProfileSection
          title="Same Cultural Background"
          profiles={sameCulturalBackground}
          users={users}
        />

        {/* Same Language Section */}
        <ProfileSection
          title="Same Language"
          profiles={sameLanguage}
          users={users}
        />

        {/* Nearby Section (Future Logic) */}
        <ProfileSection title="Nearby" profiles={nearby} users={users} />

        {/* Can't find a buddy? Blue Box */}
        {showExpandReachBox && (
          <View style={styles.card}>
            <Text style={[styles.sectionTitle, { padding: 5 }]}>
              Can't find a buddy?
            </Text>
            <Text style={[styles.sectionTitle, { padding: 5, paddingBottom: 20 }]}>
              We get it, expand your reach.
            </Text>

            <Button
              buttonColor="#407FDC"
              textColor="#FFFFFF"
              mode="elevated"
              labelStyle={{ fontWeight: "bold" }}
              onPress={() => setShowExpandReachBox(false)} // Hide the box when clicked
            >
              Make profile visible to other schools
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default BuddyScreen;
