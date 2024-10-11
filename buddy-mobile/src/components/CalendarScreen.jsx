import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import styles from "../styles/calendarScreen.style";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons

const CalendarScreen = () => {
  const navigation = useNavigation(); // Initialize useNavigation hook
  const [events, setEvents] = useState([
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

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const renderCalendar = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dates = [2, 3, 4, 5, 6, 7, 8]; // Replace with your actual date range

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          {days.map((day, index) => (
            <Text key={index} style={styles.dayText}>
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.calendarDates}>
          {dates.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateContainer,
                selectedDate === date && styles.selectedDate,
              ]}
              onPress={() => handleDateSelection(date)}
            >
              <Text style={styles.dateText}>{date}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

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
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.header}>Calendar</Text>
        <Text style={[styles.sectionTitle, { padding: 5 }]}>
          Event Categories
        </Text>
        {renderCalendar()}
        {renderEvents()}
      </View>
    </ScrollView>
  );
};

export default CalendarScreen;
