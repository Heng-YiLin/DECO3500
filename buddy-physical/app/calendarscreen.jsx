// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Link } from "expo-router";
import { CalendarProvider, Agenda } from "react-native-calendars";
import { getEvents } from "../api/api";

const CalendarScreen = () => {
  const [items, setItems] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch all events from the API endpoint
        const response = await getEvents();
        
        // Format the data to match the requirements of the Agenda component
        const formattedEvents = response.reduce((acc, event) => {
          const dateKey = event.start_date;
          const eventTime = `${event.start_time.substring(0, 5)} - ${event.end_time ? event.end_time.substring(0, 5) : ""}`;
          const eventItem = {
            name: event.name,
            location: event.location,
            time: eventTime,
            height: 50,
          };
          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }
          acc[dateKey].push(eventItem);
          return acc;
        }, {});

        setItems(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDayPress = (day) => {
    if (!items[day.dateString] || items[day.dateString].length === 0) {
      const nextEvents = Object.keys(items)
        .filter((key) => key >= day.dateString && items[key].length > 0)
        .sort()
        .slice(0, 3) // Get the next few events after the date
        .reduce((acc, key) => {
          acc[key] = items[key];
          return acc;
        }, {});
      setItems((prevItems) => ({ ...prevItems, ...nextEvents }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.parent}>
        <View style={styles.child}>
          <Text style={styles.headerText}>This Week’s Events</Text>
        </View>
      </View>

      <CalendarProvider date={new Date().toISOString().split("T")[0]} onDateChanged={handleDayPress}>
        <View style={styles.agendaContainer}>
          <Agenda
            items={items}
            selected={new Date().toISOString().split("T")[0]} // Default selected date is today
            renderItem={(item, firstItemInDay) => (
              <View style={[styles.item, { height: item.height }]}>
                <Text style={styles.eventTitle}>{item.name}</Text>
                <Text style={styles.eventLocation}>{item.location}</Text>
                <Text style={styles.eventTime}>{item.time}</Text>
              </View>
            )}
            renderEmptyDate={() => (
              <View style={styles.emptyDate}>
                <Text>No events today</Text>
              </View>
            )}
            rowHasChanged={(r1, r2) => r1.name !== r2.name}
            style={styles.agenda}
            theme={{
              agendaTodayColor: "#407FDC",
              agendaKnobColor: "#BBD0EF",
            }}
          />
        </View>
      </CalendarProvider>

      <View style={styles.navigation}>
        <Link href="/mapscreen" style={styles.arrowButton}>
          <Ionicons name="chevron-back-outline" size={60} color="#BBD0EF" />
        </Link>
        <Link href="/wordcloudscreen" style={styles.arrowButton}>
          <Ionicons name="chevron-forward-outline" size={60} color="#BBD0EF" />
        </Link>
      </View>
      <View style={styles.bottombar}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/buddy-logo.png")}
            style={styles.headerImg}
          />
        </View>
        <View style={styles.qrCode}>
          <Image
            source={require("../assets/images/qrcodebuddy.png")}
            style={styles.qrCodeImage}
          />
          <Text style={styles.text}>
            Learn more about{"\n"}
            your community.{"\n"}
            Join buddy up!
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  agendaContainer: {
    height: 500, // Adjust this to make the agenda smaller
    marginTop: 400,
  },
  headerText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#407FDC",
    marginTop: 200,
  },
  item: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventLocation: {
    fontSize: 16,
    color: "#888",
  },
  eventTime: {
    fontSize: 14,
    color: "#444",
  },
  emptyDate: {
    height: 50,
    flex: 1,
    paddingTop: 30,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  arrowButton: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  bottombar: {
    flexDirection: "row", // Align children in a row
    justifyContent: "space-between", // Space between logo and QR code
    alignItems: "center", // Center vertically
    paddingHorizontal: 20, // Add horizontal padding
    paddingVertical: 20, // Add some bottom padding if needed
    paddingTop: 50,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerImg: {
    width: 100,
    height: 100,
  },
  qrCodeImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    color: "#407FDC",
    fontWeight: "bold",
  },
  parent: {
    height: "40%",
    width: "100%",
    transform: [{ scaleX: 2 }],
    borderBottomStartRadius: 1100,
    borderBottomEndRadius: 1100,
    overflow: "hidden",
    position: "absolute",
    top: -200,
  },
  child: {
    flex: 1,
    transform: [{ scaleX: 0.5 }],
    backgroundColor: "#BBD0EF",
    alignItems: "center",
    justifyContent: "center",
  },
  qrCode: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CalendarScreen;