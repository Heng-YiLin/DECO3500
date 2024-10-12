import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getEvent, checkIfUserRSVPed, toggleRSVP } from "../api/api"; // Importing new functions
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/eventScreen.style";

function EventScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvped, setRsvped] = useState(false); // State to track RSVP status
  const [userId, setUserId] = useState(null); // State to track logged-in user ID

  // Fetch logged-in user from AsyncStorage
  useEffect(() => {
    async function fetchUser() {
      try {
        const storedUserId = await AsyncStorage.getItem("loggedInUser");
        if (storedUserId) {
          const user = JSON.parse(storedUserId);
          console.log("stored user id: ", user.id);
          setUserId(user.id); // Ensure userId is set correctly
        } else {
          console.error("User ID not found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    }
    fetchUser();
  }, []);

  // Fetch the event details when the component mounts
  useEffect(() => {
    async function fetchEventDetails() {
      try {
        const fetchedEvent = await getEvent(eventId);
        setEvent(fetchedEvent);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event:", error);
        setLoading(false);
      }
    }

    async function checkRSVPStatus() {
      if (userId) {
        const isRSVPed = await checkIfUserRSVPed(userId, eventId);
        setRsvped(isRSVPed); // Update RSVP status
      }
    }

    if (userId) {
      fetchEventDetails();
      checkRSVPStatus(); // Check if the user has RSVP'd to the event
    }
  }, [eventId, userId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#407FDC" />
        <Text>Loading event details...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
      </View>
    );
  }

  // Convert time (removing seconds)
  const formatTime = (time) => time.slice(0, 5); // "HH:MM"
  const formattedTime = `${formatTime(event.start_time)} - ${formatTime(event.end_time)}`;
  
  // Extract date and month for the new design
  const eventDate = new Date(event.start_date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('default', { month: 'short' });

  // Alternate between bookfair and orchestra images
  const eventImage = event.id % 2 === 0
    ? require("../assets/images/bookfair.png")
    : require("../assets/images/orchestra.png");

  // Handle RSVP toggling
  const handleRSVP = async () => {
    if (!userId) {
      console.error("User ID not found, unable to RSVP");
      return;
    }

    const result = await toggleRSVP(userId, eventId, rsvped);
    if (result) {
      setRsvped(!rsvped); // Toggle the RSVP state
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Image source={eventImage} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{event.name}</Text>

          {/* Date and Time View */}
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateBox}>
              <Text style={styles.dateNumber}>{day}</Text>
            </View>
            <Text style={styles.dateMonth}>{month}</Text>
            <Text style={styles.dateTime}>{formattedTime}</Text>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="gray" />
          <Text style={styles.location}>{event.location}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.agendaTitle}>Event Description</Text>
          <Text style={styles.description}>{event.description}</Text>
          <Text style={styles.agendaTitle}>Event Agenda</Text>
          <Text style={styles.description}>{event.agenda}</Text>
        </View>
      </View>
      <View style={styles.bodyBottom}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: "white", // Set background color to white
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: "orange", // Set text color to orange
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              View Group Chat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { width: 150 }]} onPress={handleRSVP}>
            <Text style={styles.buttonText}>
              {rsvped ? "Cancel RSVP" : "RSVP Now"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default EventScreen;
