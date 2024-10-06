import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Bill</Text>
        <TouchableOpacity style={styles.searchContainer}>
          <Icon name="magnify" size={20} color="#fff" />
          <Text style={styles.searchText}>Search Events</Text>
        </TouchableOpacity>
      </View>

      {/* Nearby Buddy Section */}
      <View style={styles.buddySection}>
        <Text style={styles.buddyText}>Nearby Available Buddy</Text>
        <TouchableOpacity style={styles.buddyButton}>
          <Text style={styles.buddyButtonText}>Turn on Location</Text>
        </TouchableOpacity>
      </View>

      {/* Upcoming Events Section */}
      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      <View style={styles.eventsSection}>
        <View style={styles.eventCard}>
          <Image source={{ uri: 'https://example.com/event1.jpg' }} style={styles.eventImage} />
          <Text style={styles.eventDetails}>Tomorrow at 09:30</Text>
          <Text style={styles.eventTitle}>2024 EKKA</Text>
          <Text style={styles.eventLocation}>Brisbane Showgrounds</Text>
          <Text style={styles.eventStatus}>Sam is going</Text>
        </View>
        <View style={styles.eventCard}>
          <Image source={{ uri: 'https://example.com/event2.jpg' }} style={styles.eventImage} />
          <Text style={styles.eventDetails}>29/09</Text>
          <Text style={styles.eventTitle}>2024 String Orchestra</Text>
          <Text style={styles.eventLocation}>PAC Auditorium Stage</Text>
          <Text style={styles.eventStatus}>Sam is going</Text>
        </View>
      </View>

      {/* Buddy Updates Section */}
      <Text style={styles.sectionTitle}>Buddy Updates</Text>
      <View style={styles.buddyUpdateCard}>
        <Text style={styles.buddyUpdateText}>Sam is going to book week</Text>
      </View>
      <View style={styles.buddyUpdateCard}>
        <Text style={styles.buddyUpdateText}>Sam and you are going to the EKKA</Text>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#6A9E78',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  searchText: {
    color: '#fff',
    marginLeft: 10,
  },
  buddySection: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  buddyText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  buddyButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buddyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
  eventsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '45%',
    elevation: 2,
  },
  eventImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  eventDetails: {
    marginTop: 10,
    fontSize: 12,
    color: '#777',
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5,
  },
  eventLocation: {
    fontSize: 14,
    color: '#555',
  },
  eventStatus: {
    fontSize: 12,
    color: '#555',
  },
  buddyUpdateCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  buddyUpdateText: {
    fontSize: 16,
  },
  detailsButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
