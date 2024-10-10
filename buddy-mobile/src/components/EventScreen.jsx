import * as React from "react";
import { View, Text, Image, FlatList, StyleSheet, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from "../styles/eventScreen.style"; // Assuming you have your styles defined here

const events = [
  {
    id: 2,
    title: "Orchestra",
    date: "29 Sep",
    time: "5 - 9 PM",
    imageUrl: require("../assets/images/orchestra.png"), // Using require for local images
    description:
      "libero inceptos habitasse ex. Augue mauris sapien porta cubilia pharetra facilisi posuere dictum. Placera Mollis Erat Liberos tibus",
  },
  {
    id: 1,
    title: "Book Fair",
    date: "15 Nov",
    time: "12 - 4 PM",
    imageUrl: require("../assets/images/bookfair.png"), // Using require for local images
    description:
      "Mauris inceptos hac habitasse arcu elementum vestibulum. Pharetra facilisi vehicula amet justo. Consectetur  Cursus Phasellus Risus Varius",
  },
];

function EventScreen() {
  const route = useRoute();
  const { eventId } = route.params;
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={event.imageUrl} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.date}>
          {event.date} | {event.time}
        </Text>
        <Text style={styles.description}>{event.description}</Text>
        <Text style={styles.agendaTitle}>Event Agenda</Text>
      </View>
      <View style={styles.bodyBottom}>
        <View style={styles.buttonContainer}>
          <Button
            title="View Group Chat"
            onPress={() => {
              // Handle group chat navigation
            }}
          />
          <Button style={styles.button}
            title="RSVP Now"
            onPress={() => {
              // Handle RSVP functionality
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default EventScreen;
