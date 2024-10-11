import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CalendarProvider, WeekCalendar } from "react-native-calendars"; // Import from react-native-calendars
import styles from "../styles/calendarScreen.style";
import Ionicons from "react-native-vector-icons/Ionicons";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const [events] = useState([
    {
      id: 1,
      title: "Book Fair",
      time: "2-4pm",
      status: "Attending",
      image: require("../assets/images/bookfair.png"),
    },
    {
      id: 2,
      title: "Year 5 Band",
      time: "7-8pm",
      status: "Sam Invited You",
      image: require("../assets/images/orchestra.png"),
    },
  ]);

  const renderEvents = () => {
    return (
      <View style={styles.eventsContainer}>
        {events.map((event, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("EventScreen", { eventId: event.id })
            }
          >
            <View style={styles.card}>
              <View style={styles.eventImage}>
                <Image source={event.image} style={styles.image} />
              </View>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventTime}>{event.time}</Text>
              <Text style={styles.eventStatus}>{event.status}</Text>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="arrow-forward-outline"
                  size={40}
                  color="black"
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <CalendarProvider date={new Date().toISOString().split("T")[0]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.container, { marginBottom: -5, zIndex: 1 }]}>
          <Text style={styles.header}>Calendar</Text>
          <Text style={[styles.sectionTitle, { paddingBottom: 10 }]}>
            Event Categories
          </Text>
        </View>
        <View style={[styles.nextView, { marginTop: 0 }]}>
          {/* Content of the next view */}
        </View>
        <View>
          <WeekCalendar
            style={{
              height: 350,
              padding: 5,
              elevation: 0, // Remove shadow for Android
              shadowColor: "transparent", // Remove shadow for iOS
              shadowOffset: { width: 0, height: 0 }, // No shadow offset
              shadowOpacity: 0, // Set shadow opacity to 0
              shadowRadius: 0, // Remove shadow blur radius
            }}
            firstDay={1} // Optional: Monday as the first day of the week
            markedDates={{
              "2024-10-10": { marked: true, dotColor: "red" }, // Example of marking specific dates
            }}
            onDayPress={(day) => {
              console.log("selected day", day);
            }}
          />
        </View>
        <View style={styles.container}>{renderEvents()}</View>
      </ScrollView>
    </CalendarProvider>
  );
};

export default CalendarScreen;
