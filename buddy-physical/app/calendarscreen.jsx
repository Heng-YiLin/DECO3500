import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Link } from "expo-router";
import { CalendarProvider, Agenda } from "react-native-calendars"; // Import Agenda from react-native-calendars

const mapscreen = () => {
  const [items, setItems] = useState({
    "2024-10-10": [{ name: "Event 1", height: 50 }],
    "2024-10-11": [{ name: "Event 2", height: 50 }],
    "2024-10-12": [{ name: "Event 3", height: 50 }],
  });

  return (
    <View style={styles.container}>
      <View style={styles.parent}>
        <View style={styles.child}>
          <Text style={styles.headerText}>This Week’s Events</Text>
        </View>
      </View>

      <CalendarProvider date={new Date().toISOString().split("T")[0]}>
        <View style={styles.agendaContainer}>
          <Agenda
            items={items}
            selected={new Date().toISOString().split("T")[0]} // Default selected date is today
            renderItem={(item, firstItemInDay) => (
              <View style={[styles.item, { height: item.height }]}>
                <Text>{item.name}</Text>
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
              agendaTodayColor: '#407FDC',
              agendaKnobColor: '#BBD0EF',
            }}
          />
        </View>
      </CalendarProvider>

      <View style={styles.navigation}>
        <Link href="/mapscreen" style={styles.arrowButton}>
          <Ionicons name="chevron-back-outline" size={60} color="#BBD0EF" />
        </Link>
        <Link href="/" style={styles.arrowButton}>
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
    marginTop:400,

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
    flex: 1, // Allows the logo container to take up space
    alignItems: "center", // Center the logo within its container
  },
  headerImg: {
    width: 100, // Set desired width for logo
    height: 100, // Set desired height for logo
  },
  qrCodeImage: {
    width: 80, // Set desired width for QR code
    height: 80, // Set desired height for QR code
    marginBottom: 10, // Add margin below QR code
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

export default mapscreen;
