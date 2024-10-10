import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import styles from "../styles/homeScreen.style";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();

  const events = [
    {
      id: 1,
      title: "Book fair",
      location: "Brisbane Showgrounds",
      image: require("../assets/images/bookfair.png"),
    },
    {
      id: 2,
      title: "Orchestra",
      location: "PAC Auditorium Stage",
      image: require("../assets/images/orchestra.png"),
    },
    // Add more events as needed
  ];

  const renderEvent = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventScreen', { eventId: item.id })}
    >
      <Image source={item.image} style={styles.eventImage} />
      <View style={styles.bottomEventCard}>
        <Text style={styles.sectionTitle}>{item.title}</Text>
        <Text>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Image
            source={require("../assets/images/homeImg.png")}
            style={styles.headerImg}
          />
          <Text style={styles.greeting}>Hello, Bill</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <Ionicons
            name="search"
            size={20}
            color="gray"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Search Events"
            placeholderTextColor="gray"
          />
        </View>
      </View>

      <View style={styles.homeBody}>
        {/* Nearby Buddy Section */}
        <View style={styles.section}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Nearby Available Buddy</Text>
            <Text>Turn on location services</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Turn on Location</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Upcoming Events Section */}
        <Text style={styles.sectionHeader}>Upcoming Events</Text>
 </View>
 <View style={styles.carouselContainer}>
          <FlatList
            data={events}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderEvent}
          />
        </View>
 <View style={styles.homeBody}>

        {/* Buddy Updates Section */}
        <Text style={styles.sectionHeader}>Buddy Updates</Text>
        <View style={styles.buddyUpdates}>
          <View style={styles.card}>
            <Text style={{ fontWeight: "bold" }}>
              Sam is going to book week
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>RSVP</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={{ fontWeight: "bold" }}>
              Sam and you are going to the EKKA
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
