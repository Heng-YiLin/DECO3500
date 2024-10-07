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
  StyleSheet,
  SafeAreaView,
} from "react-native";

const ProfileSection = ({ title, profiles }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.profiles}>
      {profiles.map((profile, index) => (
        <View key={index} style={styles.iconContainer}>
          <Ionicons name="person-circle-outline" size={40} color="#1F3A6E" />
          <Text style={styles.profileName}>{profile}</Text>
        </View>
      ))}
    </View>
  </View>
);

const BuddyScreen = () => {
  const buddies = ["Sam"];
  const requests = ["Polly"];
  const sameCulturalBackground = ["Nisha", "Tony", "Henry", "Lonni"];
  const sameLanguage = ["Sam", "Bill"];
  const nearby = ["Lucy"];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Buddies</Text>
      <View style={styles.bodyContainer}>
        <ProfileSection title="Your Buddies" profiles={buddies} />
        <ProfileSection title="Requests" profiles={requests} />
        <ProfileSection
          title="Same Cultural Background"
          profiles={sameCulturalBackground}
        />
        <ProfileSection title="Same Language" profiles={sameLanguage} />
        <ProfileSection title="Nearby" profiles={nearby} />
        <View style={styles.card}>
            <Text style={[styles.sectionTitle, { padding: 5 }]}>Can't find a buddy?</Text>
            <Text style={[styles.sectionTitle, { padding:5, paddingBottom: 20 }]}>We get it, expand your reach.</Text>

            <Button buttonColor="#407FDC" textColor = "#FFFFFF" mode="elevated"  labelStyle={{ fontWeight: 'bold' }} onPress={() => console.log("location button")}>
                Make profile visible to other schools
            </Button>
          </View>
      </View>

 
    </ScrollView>
  );
};
export default BuddyScreen;
