import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Link } from "expo-router";
import MapView from "react-native-maps";

const mapscreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.parent}>
        <View style={styles.child}>
          <Text style={styles.headerText}>Our Global Buddy Community</Text>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <MapView style={styles.map} />
      </View>

      <View style={styles.navigation}>
        <Link href="/" style={styles.arrowButton}>
          <Ionicons name="chevron-back-outline" size={60} color="#BBD0EF" />
        </Link>
        <Link href="/calendarscreen" style={styles.arrowButton}>
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
  headerImg: {
    marginTop: 50,
    alignSelf: "center",
  },
  headerText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#407FDC",
    marginTop:200,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 20, // Optional: Add some border radius for aesthetics
  },
  mapContainer: {
    marginTop: "40%", // Adjusting the margin to better position the map
    width: "100%", // Adjusted width for the map
    height: "50%", // Keeping the height smaller
    justifyContent: "center", // Centering the map
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 20,
    color: "#407FDC",
    fontWeight: "bold",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0, // Ensures the buttons are on both sides
    paddingHorizontal: 20, // Padding for spacing
  },
  arrowButton: {
    borderRadius: 50, // Changed to make it round
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
