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
    background:"Australian",
    language: "English \nHindi",
    interests:
"Tennis \nHiking",  }
];

function ProfileScreen() {
  const route = useRoute();
  const user = users.find((e) => e.id === 1);

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
        <Text style={styles.date}>
          {user.location}
        </Text>
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
              width:"100%",
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
