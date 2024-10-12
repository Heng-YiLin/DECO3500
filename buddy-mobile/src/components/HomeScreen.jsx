import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import styles from "../styles/homeScreen.style";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for user data retrieval
import { getEvents, getBuddyUpdates } from "../api/api"; // Import getEvents and getBuddyUpdates functions

function HomeScreen() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]); // State to hold the fetched events
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState(''); // State to track the search query
  const [showLocationSection, setShowLocationSection] = useState(true); // State to control visibility of the location section
  const [buddyUpdates, setBuddyUpdates] = useState([]); // State to hold buddy updates
  const [userName, setUserName] = useState(''); // State to hold the first name of the user

  // Fetch events when the component mounts
  useEffect(() => {
    async function fetchEvents() {
      try {
        const fetchedEvents = await getEvents(); // Fetch events from the backend
        setEvents(fetchedEvents); // Update the state with fetched events
        setLoading(false); // Turn off loading
      } catch (error) {
        console.error("Error fetching events:", error); // Log any errors
        setLoading(false); // Turn off loading on error
      }
    }

    fetchEvents(); // Trigger the fetch
  }, []);

  // Fetch buddy updates for the "Buddy Updates" section
  useEffect(() => {
    async function fetchBuddyUpdates() {
      try {
        const updates = await getBuddyUpdates(); // Fetch buddy updates (users attending events)
        setBuddyUpdates(updates);
      } catch (error) {
        console.error("Error fetching buddy updates:", error);
      }
    }

    fetchBuddyUpdates();
  }, []);

  // Fetch logged-in user data when the component mounts
  useEffect(() => {
    async function loadUserData() {
      try {
        const userData = await AsyncStorage.getItem('loggedInUser'); // Retrieve logged-in user data from AsyncStorage
        if (userData) {
          const user = JSON.parse(userData); // Parse the user data
          const firstName = user.name.split(' ')[0]; // Extract the first name from the full name
          setUserName(firstName); // Update the state with the first name
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    }

    loadUserData(); // Trigger user data loading
  }, []);

  // Function to filter events by name
  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderEvent = ({ item, index }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventScreen', { eventId: item.id })}
    >
      {/* Alternating images based on index (even/odd) */}
      <Image 
        source={index % 2 === 0 ? require("../assets/images/bookfair.png") : require("../assets/images/orchestra.png")} 
        style={styles.eventImage} 
      />
      <View style={styles.bottomEventCard}>
        <Text style={styles.sectionTitle}>{item.name}</Text>
        <Text>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderBuddyUpdate = ({ item }) => (
    <View style={styles.card}>
      <Text style={{ fontWeight: "bold" }}>
        {item.name} is attending {item.event_name}
      </Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('EventScreen', { eventId: item.event_id })} // Navigate to event screen
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading events...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Image
            source={require("../assets/images/homeImg.png")}
            style={styles.headerImg}
          />
          <Text style={styles.greeting}>Hello, {userName}</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <Ionicons
            name="search"
            size={20}
            color="gray"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Search Events"
            placeholderTextColor="gray"
            value={searchQuery} // Bind searchQuery to the input field
            onChangeText={setSearchQuery} // Update search query as user types
          />
        </View>
      </View>

      <View style={styles.homeBody}>
        {/* Conditionally render the Nearby Buddy Section */}
        {showLocationSection && (
          <View style={styles.section}>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Nearby Available Buddy</Text>
              <Text>Turn on location services</Text>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => setShowLocationSection(false)} // Hide section when clicked
              >
                <Text style={styles.buttonText}>Turn on Location</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Upcoming Events Section */}
        <Text style={styles.sectionHeader}>Upcoming Events</Text>
      </View>

      <View style={styles.carouselContainer}>
        <FlatList
          data={filteredEvents} // Use the filtered events instead of all events
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()} // Ensure proper key
          renderItem={renderEvent}
        />
      </View>

      <View style={styles.homeBody}>
        {/* Buddy Updates Section */}
        <Text style={styles.sectionHeader}>Buddy Updates</Text>
        <View style={styles.buddyUpdates}>
          <FlatList
            data={buddyUpdates} // Use buddy updates data
            keyExtractor={(item) => item.event_id.toString()} // Ensure proper key
            renderItem={renderBuddyUpdate} // Render buddy update cards
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
