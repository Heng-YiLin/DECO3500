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
import styles from "../styles/eventScreen.style"; // Assuming you have your styles defined here

const events = [
  {
    id: 2,
    title: "Help! Finding Costume",
    date: "29 Sep",
    categories: "book fair, characters",
    content:
      "libero inceptos habitasse ex. Augue mauris sapien porta cubilia pharetra facilisi posuere dictum. Placera Mollis Erat Liberos tibus",
    likes:5,
  },
  {
    id: 1,
    title: "Favourite Books for Prep? ",
    date: "29 Sep",
    categories: "book fair, characters",
    content:
      "libero inceptos habitasse ex. Augue mauris sapien porta cubilia pharetra facilisi posuere dictum. Placera Mollis Erat Liberos tibus",
    likes:5,
  },
];

function Forum() {
  const route = useRoute();
  const { id } = route.params;
  const event = events.find((e) => e.id === id);
  
  return (
    <View style={styles.container}>
      <Image source={event.imageUrl} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.date}>
          {event.date} | {event.time}
        </Text>
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
              s
            >
              View Group Chat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { width: 150 }]}>
            <Text style={styles.buttonText}>RSVP Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Forum;
