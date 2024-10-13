import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Link } from "expo-router";
import WordCloud from "rn-wordcloud";
import { getComments } from "../api/api";

const WordCloudScreen = () => {
  const [wordData, setWordData] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments();
        if (response.length === 0) {
          setWordData([]);
          console.log("No comments found.");
          return;
        }

        const comments = response.map((comment) => comment.comment_text);
        const wordCount = countWords(comments);
        const wordDataFormatted = formatWordData(wordCount);

        // Set the formatted word data to state
        setWordData(wordDataFormatted);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const countWords = (comments) => {
      return comments
        .join(" ")
        .split(/\s+/)
        .reduce((acc, word) => {
          const sanitizedWord = word.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
          if (sanitizedWord) {
            acc[sanitizedWord] = (acc[sanitizedWord] || 0) + 1;
          }
          return acc;
        }, {});
    };

    const formatWordData = (wordCount) => {
      return Object.keys(wordCount)
      .filter(word => word.length > 3) // Filter out words with 1 or 2 characters
      .map(word => ({
        text: word,
        value: wordCount[word],
      }));
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
        {wordData.length > 0 && (
          <WordCloud
            options={{
              words: wordData,
              verticalEnabled: true,
              minFont: 20,
              maxFont: 100,
              fontOffset: 1,
              width: 800,
              height: 400,
              fontFamily: "Arial",
            }}
          />
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
    marginTop: 200,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
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
