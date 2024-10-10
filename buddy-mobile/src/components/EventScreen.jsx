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
    title: "Orchestra",
    date: "29 Sep",
    time: "5 - 9 PM",
    imageUrl: require("../assets/images/orchestra.png"), // Using require for local images
    description:
      "libero inceptos habitasse ex. Augue mauris sapien porta cubilia pharetra facilisi posuere dictum. Placera Mollis Erat Liberos tibus",
    agenda:
      "1. Placerat \n2. mollis \n3. erat \n4. libero \n5. penatibus ",
  },
  {
    id: 1,
    title: "Book Fair",
    date: "15 Nov",
    time: "12 - 4 PM",
    imageUrl: require("../assets/images/bookfair.png"), // Using require for local images
    description:
      "Mauris inceptos hac habitasse arcu elementum vestibulum. Pharetra facilisi vehicula amet justo. Consectetur  Cursus Phasellus Risus Varius",
    agenda:
    "1. Placerat \n2. mollis \n3. erat \n4. libero \n5. penatibus ",
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

export default EventScreen;
