// Import necessary dependencies
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Link } from "expo-router";
import WordCloud from "react-d3-cloud"; // Import the WordCloud component from react-d3-cloud
import { getComments } from "../api/api";

const WordCloudScreen = () => {
  const [wordData, setWordData] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Fetch all comments from the API endpoint
        const response = await getComments();
        const comments = response.map(comment => comment.comment_text);

        // Count word frequency
        const wordCount = comments.join(" ")
          .split(/\s+/)
          .reduce((acc, word) => {
            const sanitizedWord = word.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
            if (sanitizedWord) {
              acc[sanitizedWord] = (acc[sanitizedWord] || 0) + 1;
            }
            return acc;
          }, {});

        // Format word data for the word cloud
        const wordDataFormatted = Object.keys(wordCount).map(word => ({
          text: word,
          value: wordCount[word],
        }));

        setWordData(wordDataFormatted);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.parent}>
        <View style={styles.child}>
          <Text style={styles.headerText}>Forum Word Cloud</Text>
        </View>
      </View>

      <View style={styles.wordCloudContainer}>
        {wordData.length > 0 ? (
          <WordCloud
            data={wordData}
            fontSizeMapper={(word) => Math.log2(word.value) * 5}
            rotate={(word) => word.value % 360}
            width={400}
            height={400}
          />
        ) : (
          <Text>Loading word cloud...</Text>
        )}
      </View>

      <View style={styles.navigation}>
        <Link href="/calendarscreen" style={styles.arrowButton}>
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
  headerText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#407FDC",
    marginTop: 200,
  },
  wordCloudContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
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
  qrCode: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WordCloudScreen;