import * as React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from "../styles/profileScreen.style"; // Assuming you have your styles defined here

const users = [
  {
    id: 1,
    title: "Sam Taylor",
    location: "North Ryde, NSW",
    imageUrl: require("../assets/images/profile.png"), // Using require for local images
    background: "Australian",
    language: "English \nHindi",
    interests: "Tennis \nHiking",
  },
  {
    id: 2,
    title: "Polly Smith",
    location: "Melbourne, VIC",
    imageUrl: require("../assets/images/profile.png"),
    background: "European",
    language: "English \nSpanish",
    interests: "Reading \nCooking",
  },
  {
    id: 3,
    title: "Nisha Patel",
    location: "Sydney, NSW",
    imageUrl: require("../assets/images/profile.png"),
    background: "Indian",
    language: "Hindi \nEnglish",
    interests: "Art \nPhotography",
  },
  {
    id: 4,
    title: "Tony Zhang",
    location: "Brisbane, QLD",
    imageUrl: require("../assets/images/profile.png"),
    background: "Asian",
    language: "Chinese \nEnglish",
    interests: "Gaming \nSports",
  },
  {
    id: 5,
    title: "Henry Mwangi",
    location: "Nairobi, Kenya",
    imageUrl: require("../assets/images/profile.png"),
    background: "African",
    language: "English \nSwahili",
    interests: "Music \nDancing",
  },
  {
    id: 6,
    title: "Lonni Müller",
    location: "Berlin, Germany",
    imageUrl: require("../assets/images/profile.png"),
    background: "European",
    language: "German \nEnglish",
    interests: "Cooking \nTraveling",
  },
  {
    id: 7,
    title: "Bill Johnson",
    location: "Los Angeles, CA",
    imageUrl: require("../assets/images/profile.png"),
    background: "American",
    language: "English",
    interests: "Sports \nMovies",
  },
  {
    id: 8,
    title: "Lucy Brown",
    location: "Sydney, NSW",
    imageUrl: require("../assets/images/profile.png"),
    background: "Australian",
    language: "English \nFrench",
    interests: "Surfing \nTraveling",
  },
];


function ProfileScreen() {
  const route = useRoute();
  const { Id } = route.params;
  const user = users.find((e) => e.id === Id);


  if (!user) {
    return (
      <View style={styles.container}>
        <Text>user not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={user.imageUrl} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{user.title}</Text>
        <Text style={styles.date}>{user.location}</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.agendaTitle}>Cultural Background</Text>
          <Text style={styles.description}>{user.background}</Text>
          <Text style={styles.agendaTitle}>Languages Spoken</Text>
          <Text style={styles.description}>{user.language}</Text>
          <Text style={styles.agendaTitle}>Interests</Text>
          <Text style={styles.description}>{user.interests}</Text>
        </View>
      </View>
      <View style={styles.bodyBottom}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: "white", // Set background color to white
              padding: 10,
              borderRadius: 5,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "orange", // Set text color to orange
                textAlign: "right",
                fontSize: 20,
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              Request Buddy
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ProfileScreen;
