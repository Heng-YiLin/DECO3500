import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView, // Added ScrollView for scrolling
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getEvent, checkIfUserRSVPed, toggleRSVP } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/eventScreen.style";

function EventScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvped, setRsvped] = useState(false);
  const [userId, setUserId] = useState(null);

  // Fetch logged-in user from AsyncStorage
  useEffect(() => {
    async function fetchUser() {
      try {
        const storedUserId = await AsyncStorage.getItem("loggedInUser");
        if (storedUserId) {
          const user = JSON.parse(storedUserId);
          setUserId(user.id);
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
        setRsvped(isRSVPed);
      }
    }

    if (userId) {
      fetchEventDetails();
      checkRSVPStatus();
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

  // Ensure that time and other values are properly formatted as strings
  const formatTime = (time) => (time ? time.slice(0, 5) : ""); // "HH:MM"
  const formattedTime = `${formatTime(event.start_time)} - ${formatTime(event.end_time)}`;

  // Extract date and month for the new design
  const eventDate = new Date(event.start_date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString("default", { month: "short" });

  // Placeholder image based on event id (you can change this)
  const eventImage = event.id % 2 === 0 ? require("../assets/images/bookfair.png") : require("../assets/images/orchestra.png");

  const handleRSVP = async () => {
    if (!userId) {
      console.error("User ID not found, unable to RSVP");
      return;
    }

    const result = await toggleRSVP(userId, eventId, rsvped);
    if (result) {
      setRsvped(!rsvped);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Image source={eventImage} style={styles.image} />

        <View style={styles.body}>
          <View style={styles.headerContainer}>
            {/* Event Name */}
            <Text style={styles.title}>{event.name || "Event Name"}</Text>

            {/* Date and Time View */}
            <View style={styles.dateTimeContainer}>
              <View style={styles.dateBox}>
                <Text style={styles.dateNumber}>{day.toString()}</Text>
              </View>
              <Text style={styles.dateMonth}>{month}</Text>
              <Text style={styles.dateTime}>{formattedTime}</Text>
            </View>
          </View>

          {/* Location */}
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={32} color="gray" />
            <Text style={styles.location}>{event.location || "No location provided"}</Text>
          </View>

          {/* Description and Agenda */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.agendaTitle}>Event Description</Text>
            <Text style={styles.description}>{event.description || "No description provided"}</Text>

            <Text style={styles.agendaTitle}>Event Agenda</Text>
            <Text style={styles.description}>{event.agenda || "No agenda provided"}</Text>
          </View>
        </View>

        <View style={styles.bodyBottom}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}>
              <Text style={{ color: "orange", textAlign: "center", fontSize: 20, fontWeight: "bold", textDecorationLine: "underline" }}>
                View Group Chat
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { width: 150 }]} onPress={handleRSVP}>
              <Text style={styles.buttonText}>{rsvped ? "Cancel RSVP" : "RSVP Now"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default EventScreen;
