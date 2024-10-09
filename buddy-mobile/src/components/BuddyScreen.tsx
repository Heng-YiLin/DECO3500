import * as React from "react";
import { Ionicons } from "@expo/vector-icons"; // If using Expo for icons
import styles from "./buddyScreen.style";
import { Button } from "react-native-paper";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,

} from "react-native";

const ProfileSection = ({ title, profiles }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <FlatList
      data={profiles}
      renderItem={({ item }) => (
        <View style={styles.iconContainer}>
          <Ionicons name="person-circle-outline" size={40} color="#1F3A6E" />
          <Text style={styles.profileName}>{item}</Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()} // Key extractor for FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.profiles} // Optional: Add additional styles if needed
    />
  </View>
);
const BuddyScreen = () => {
  const buddies = ["Sam"];
  const requests = ["Polly"];
  const sameCulturalBackground = ["Nisha", "Tony", "Henry", "Lonni"];
  const sameLanguage = ["Sam", "Bill"];
  const nearby = ["Lucy"];

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Buddies</Text>
      <View style={styles.bodyContainer}>
        <View style={styles.card}>
          <View>
            <Text style={[styles.sectionTitle, { padding: 5 }]}>
              Nearby Available Buddy
            </Text>
            <Text
              style={[styles.sectionTitle, { padding: 5, paddingBottom: 20 }]}
            >
              Turn on location services
            </Text>
            <Button
              buttonColor="#407FDC"
              textColor="#FFFFFF"
              mode="elevated"
              labelStyle={{ fontWeight: "bold" }}
              onPress={() => console.log("location button")}
            >
              Turn on Location
            </Button>
          </View>
        </View>
        <ProfileSection title="Your Buddies" profiles={buddies} />
        <ProfileSection title="Requests" profiles={requests} />
        <ProfileSection
          title="Same Cultural Background"
          profiles={sameCulturalBackground}
        />
        <ProfileSection title="Same Language" profiles={sameLanguage} />
        <ProfileSection title="Nearby" profiles={nearby} />
        <View style={styles.card}>
          <Text style={[styles.sectionTitle, { padding: 5 }]}>
            Can't find a buddy?
          </Text>
          <Text
            style={[styles.sectionTitle, { padding: 5, paddingBottom: 20 }]}
          >
            We get it, expand your reach.
          </Text>

          <Button
            buttonColor="#407FDC"
            textColor="#FFFFFF"
            mode="elevated"
            labelStyle={{ fontWeight: "bold" }}
            onPress={() => console.log("location button")}
          >
            Make profile visible to other schools
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default BuddyScreen;
