import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import styles from "../styles/style";

const HomeScreen = () => {
  return (
    <ScrollView>
      {/* Header */}
      <View >
        <Text>Hello, Bill</Text>
        <Image
          source={require("../assets/images/homeImg.png")} // Adjust the path to your image s
        /> 
      </View>

      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.searchContainer}>
          <Icon name="magnify" size={20} color="#fff" />
          <Text style={styles.searchText}>Search Events</Text>
          <Link href="/home">About</Link>
        </TouchableOpacity>
      </View>
      <View style={styles.buddySection}>
        <Text style={styles.buddyText}>Nearby Available Buddy</Text>
        <TouchableOpacity style={styles.buddyButton}>
          <Text style={styles.buddyButtonText}>Turn on Location</Text>
        </TouchableOpacity>
      </View> */}

      {/* Upcoming Events Section */}
      {/* <Text style={styles.sectionTitle}>Upcoming Events</Text>
      <View style={styles.eventsSection}>
        <View style={styles.eventCard}>
          <Image
            source={{ uri: "https://example.com/event1.jpg" }}
            style={styles.eventImage}
          />
          <Text style={styles.eventDetails}>Tomorrow at 09:30</Text>
          <Text style={styles.eventTitle}>2024 EKKA</Text>
          <Text style={styles.eventLocation}>Brisbane Showgrounds</Text>
          <Text style={styles.eventStatus}>Sam is going</Text>
        </View>
        <View style={styles.eventCard}>
          <Image
            source={{ uri: "https://example.com/event2.jpg" }}
            style={styles.eventImage}
          />
          <Text style={styles.eventDetails}>29/09</Text>
          <Text style={styles.eventTitle}>2024 String Orchestra</Text>
          <Text style={styles.eventLocation}>PAC Auditorium Stage</Text>
          <Text style={styles.eventStatus}>Sam is going</Text>
        </View>
      </View> */}

      {/* Buddy Updates Section */}
      {/* <Text style={styles.sectionTitle}>Buddy Updates</Text>
      <View style={styles.buddyUpdateCard}>
        <Text style={styles.buddyUpdateText}>Sam is going to book week</Text>
      </View>
      <View style={styles.buddyUpdateCard}>
        <Text style={styles.buddyUpdateText}>
          Sam and you are going to the EKKA
        </Text>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
};

export default HomeScreen;
