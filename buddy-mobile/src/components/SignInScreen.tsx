import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import styles from "./homeScreen.style";
import { Ionicons } from "@expo/vector-icons";

function SignInScreen() {
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Image
            source={require("../assets/images/homeImg.png")}
            style={styles.headerImg}
          />
          <Text style={styles.greeting}>Hello, Bill</Text>
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
          />
        </View>
      </View>

      <View style={styles.homeBody}>
        {/* Nearby Buddy Section */}
        <View style={styles.section}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Nearby Available Buddy</Text>
            <Text>Turn on location services</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Turn on Location</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Upcoming Events Section */}
        <Text style={styles.sectionHeader}>Upcoming Events</Text>
        <View style={styles.eventRow}>
          <View style={styles.eventCard}>
            <Image
              source={require("../assets/images/orchestra.png")}
              style={styles.eventImage}
            />
            <Text>2024 EKKA</Text>
            <Text>Brisbane Showgrounds</Text>
          </View>

          <View style={styles.eventCard}>
            <Image
              source={require("../assets/images/ekka.png")}
              style={styles.eventImage}
            />
            <Text>2024 String Orchestra</Text>
            <Text>PAC Auditorium Stage</Text>
          </View>
        </View>

        {/* Buddy Updates Section */}
        <Text style={styles.sectionHeader}>Buddy Updates</Text>
        <View style={styles.buddyUpdates}>
          <View style={styles.card}>
            <Text>Sam is going to book week</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>RSVP</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text>Sam and you are going to the EKKA</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default SignInScreen;
