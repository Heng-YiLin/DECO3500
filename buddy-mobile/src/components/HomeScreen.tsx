import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import styles from './homeScreen.style';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function HomeScreen() {
  return (
    <ScrollView>
      {/* Header */}
      <View style={styles.header}>
        <View >
        <Image source={require('../assets/images/homeImg.png')} style={styles.headerImg} />
        <Text style={styles.greeting}>Hello, Bill</Text>
        </View>
        <TextInput style={styles.searchBar} placeholder="Search Events" />
      </View>
      
      {/* Nearby Buddy Section */}
      <View style={styles.section}>
        <View style={styles.buddyCard}>
          <Text style={styles.sectionTitle}>Nearby Available Buddy</Text>
          <Text>Turn on location services</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Turn on Location</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Upcoming Events Section */}
      <Text style={styles.sectionHeader}>Upcoming Events</Text>
      <View style={styles.eventRow}>
        <View style={styles.eventCard}>
          <Image source={require('../assets/images/ekka.png')} style={styles.eventImage} />
          <Text>2024 EKKA</Text>
          <Text>Brisbane Showgrounds</Text>
        </View>

        <View style={styles.eventCard}>
          <Image source={require('../assets/images/orchestra.png')} style={styles.eventImage} />
          <Text>2024 String Orchestra</Text>
          <Text>PAC Auditorium Stage</Text>
        </View>
      </View>
      
      {/* Buddy Updates Section */}
      <Text style={styles.sectionHeader}>Buddy Updates</Text>
      <View style={styles.buddyUpdates}>
        <View style={styles.buddyCard}>
          <Text>Sam is going to book week</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>RSVP</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buddyCard}>
          <Text>Sam and you are going to the EKKA</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;