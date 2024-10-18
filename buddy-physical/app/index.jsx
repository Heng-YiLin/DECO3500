import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Link } from "expo-router";

const Index = () => {
  
  return ( 

    <View style={styles.container}>
      
      <View style={styles.parent}>
        <View style={styles.child}>
          <Image
            source={require("../assets/images/buddy-logo.png")}
            style={styles.headerImg}
          />
          <Text style={styles.headerText}>Join Buddy</Text>
        </View>
      </View>

      <View style={styles.qrCode}>
        <Image
          source={require("../assets/images/qrcodebuddy.png")}
          style={styles.qrCodeImage}
        />
        <Text style={styles.text}>Scan QR Code to buddy up!</Text>
      </View>

      <View style={styles.navigation}>
        <Link href="/wordcloudscreen" style={styles.arrowButton}>
          <Ionicons name="chevron-back-outline" size={60} color="#BBD0EF" />
        </Link>
        <Link href="/mapscreen" style={styles.arrowButton}>
          <Ionicons name="chevron-forward-outline" size={60} color="#BBD0EF" />
        </Link>
      </View>

      <View style={styles.bottom}>
        <Image source={require("../assets/images/frontimg.png")} />
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
    marginTop: 200,
  },
  headerText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#407FDC",
  },
  qrCode: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
  },
  qrCodeImage: {
    marginTop: 300,
    width: 300,
    height: 300,
    marginBottom: 20,
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
  bottom: {
    alignItems: "center",
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
});

export default Index;
