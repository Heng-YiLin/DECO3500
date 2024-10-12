import * as React from "react";
import { Ionicons } from "@expo/vector-icons"; // If using Expo for icons
import styles from "../styles/buddyScreen.style";
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";

const ProfileSection = ({ title, profiles, users }) => {
  const navigation = useNavigation(); // Get the navigation object

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <FlatList
        data={profiles.map(id => users.find(user => user.id === id))} // Map IDs to user objects
        renderItem={({ item }) => (
          item ? ( // Check if item exists
            <TouchableOpacity 
              style={styles.iconContainer}
              onPress={() => navigation.navigate('ProfileScreen', { userId: item.id })} // Navigate to ProfileScreen
            >
              <Ionicons name="person-circle-outline" size={40} color="#1F3A6E" />
              <Text style={styles.profileName}>{item.username}</Text>
            </TouchableOpacity>
          ) : null
        )}
        keyExtractor={item => item.id.toString()} // Key extractor for FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.profiles} // Optional: Add additional styles if needed
      />
    </View>
  );
};

const BuddyScreen = () => {
  const users = [
    { id: 1, username: 'Sam', password: '12345', background: 'Asian', languages: ['English', 'Spanish'], interests: ['Traveling', 'Cooking'], location: 'New York' },
    { id: 2, username: 'Polly', password: 'abcde', background: 'European', languages: ['English'], interests: ['Reading', 'Music'], location: 'London' },
    { id: 3, username: 'Nisha', password: 'pass123', background: 'Indian', languages: ['Hindi', 'English'], interests: ['Art', 'Photography'], location: 'Mumbai' },
    { id: 4, username: 'Tony', password: 'pass456', background: 'Asian', languages: ['Chinese', 'English'], interests: ['Gaming', 'Sports'], location: 'Beijing' },
    { id: 5, username: 'Henry', password: 'pass789', background: 'African', languages: ['English', 'Swahili'], interests: ['Music', 'Dancing'], location: 'Nairobi' },
    { id: 6, username: 'Lonni', password: 'pass000', background: 'European', languages: ['German', 'English'], interests: ['Cooking', 'Traveling'], location: 'Berlin' },
    { id: 7, username: 'Bill', password: 'xyz123', background: 'American', languages: ['English'], interests: ['Sports', 'Movies'], location: 'Los Angeles' },
    { id: 8, username: 'Lucy', password: 'pass111', background: 'Australian', languages: ['English'], interests: ['Surfing', 'Traveling'], location: 'Sydney' },
  ];
  
  const buddies = [1]; // ID of Sam
  const requests = [2]; // ID of Polly
  const sameCulturalBackground = [3, 4, 5, 6]; // IDs of Nisha, Tony, Henry, Lonni
  const sameLanguage = [1, 7]; // IDs of Sam, Bill
  const nearby = [8]; // ID of Lucy

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Buddies</Text>
      <View style={styles.bodyContainer}>
        <View style={styles.card}>
          <View>
            <Text style={[styles.sectionTitle, { padding: 5 }]}>
              Nearby Available Buddy
            </Text>
            <Text style={[styles.sectionTitle, { padding: 5, paddingBottom: 20 }]}>
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
        
        <ProfileSection title="Your Buddies" profiles={buddies} users={users} />
        <ProfileSection title="Requests" profiles={requests} users={users} />
        <ProfileSection title="Same Cultural Background" profiles={sameCulturalBackground} users={users} />
        <ProfileSection title="Same Language" profiles={sameLanguage} users={users} />
        <ProfileSection title="Nearby" profiles={nearby} users={users} />

        <View style={styles.card}>
          <Text style={[styles.sectionTitle, { padding: 5 }]}>
            Can't find a buddy?
          </Text>
          <Text style={[styles.sectionTitle, { padding: 5, paddingBottom: 20 }]}>
            We get it, expand your reach.
          </Text>

          <Button
            buttonColor="#407FDC"
            textColor="#FFFFFF"
            mode="elevated"
            labelStyle={{ fontWeight: "bold" }}
            onPress={() => console.log("Make profile visible button")}
          >
            Make profile visible to other schools
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default BuddyScreen;
