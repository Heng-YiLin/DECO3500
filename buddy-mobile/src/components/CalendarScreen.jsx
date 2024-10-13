import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CalendarProvider, WeekCalendar } from "react-native-calendars";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../styles/calendarScreen.style";
import { getEventsByDate, getEventCategories, fetchDistinctEventCategories, getEvents } from "../api/api";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]); // State to hold events of the selected day
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [categories, setCategories] = useState([]); // Categories for filtering
  const [allCategories, setAllCategories] = useState([]); // Store distinct categories
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category state
  const [filteredEvents, setFilteredEvents] = useState([]); // Filtered events based on category or search query
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // State to hold selected date
  const [markedDates, setMarkedDates] = useState({}); // Marked dates state
  const [monthLabel, setMonthLabel] = useState(""); // State to hold the month label

  // Fetch categories and distinct events on mount
  useEffect(() => {
    async function fetchCategoriesAndDistinctEvents() {
      try {
        const fetchedCategories = await getEventCategories(); // Fetch all event categories
        const distinctCategories = await fetchDistinctEventCategories(); // Fetch distinct categories
        const allEvents = await getEvents();

        setCategories(fetchedCategories);
        setAllCategories([...new Set(distinctCategories.map((item) => item.category_name))]);
        setAllEvents(allEvents);

        // Mark dates with events and add an orange dot
        const marked = {};
        allEvents.forEach(event => {
          console.log("event: ", event);
          const formattedDate = event.start_date; // Ensure the date is in "YYYY-MM-DD" format
          console.log("formatted date: ", formattedDate);
          marked[formattedDate] = { marked: true, dotColor: '#E48022' }; // Orange dot for marked dates
        });
        setMarkedDates(marked);
        console.log("marked dates: ", markedDates);
      } catch (error) {
        console.error("Error fetching categories or distinct events:", error);
      }
    }
    fetchCategoriesAndDistinctEvents();
  }, []);

  // Fetch events for selected date
  useEffect(() => {
    async function fetchEventsForSelectedDate() {
      try {
        const eventsByDate = await getEventsByDate(selectedDate);
        setEvents(eventsByDate); // Set events for the selected date
        setFilteredEvents(eventsByDate); // Initially display all events on that date
      } catch (error) {
        console.error("Error fetching events by date:", error);
      }
    }
    fetchEventsForSelectedDate();
  }, [selectedDate]);

  // Update the month label whenever the selected date changes
  useEffect(() => {
    const date = new Date(selectedDate);
    const monthName = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    setMonthLabel(`${monthName} ${year}`);
  }, [selectedDate]);

  // Apply search and category filters whenever events or filters change
  useEffect(() => {
    let filtered = events;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected category (make sure categories exist for the event)
    if (selectedCategory) {
      filtered = filtered.filter((event) =>
        event.categories && event.categories.includes(selectedCategory)
      );
    }

    setFilteredEvents(filtered);
  }, [searchQuery, selectedCategory, events]);

  // Render each event with image and details
  const renderEvent = ({ item, index }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventScreen', { eventId: item.id })}
    >
      <Image
        source={index % 2 === 0 ? require("../assets/images/bookfair.png") : require("../assets/images/orchestra.png")}
        style={styles.eventImage}
      />
      <View style={styles.bottomEventCard}>
        <Text style={styles.sectionTitle}>{item.name}</Text>
        <Text style={styles.sectionSub}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render event categories
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.selectedCategoryButton,
      ]}
      onPress={() => setSelectedCategory(item === selectedCategory ? null : item)}
    >
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <CalendarProvider date={new Date().toISOString().split("T")[0]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.container, { marginBottom: -5, zIndex: 1 }]}>
          <Text style={styles.header}>Calendar</Text>

          {/* Plus Icon */}
          <TouchableOpacity
            style={styles.plusIconContainer}
            onPress={() => navigation.navigate('AddEventScreen')}
          >
            <Ionicons name="add" size={30} color="#274766" />
          </TouchableOpacity>

          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
            <TextInput
              style={styles.searchBar}
              placeholder="Search Events"
              placeholderTextColor="gray"
              value={searchQuery}
              onChangeText={setSearchQuery} // Update search query as user types
            />
          </View>

          {/* Event Categories */}
          <Text style={styles.sectionTitle}>Event Categories</Text>
          <FlatList
            data={allCategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()} // Using index as key if categories are strings
            renderItem={renderCategory}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>

        {/* Month Label */}
        <Text style={styles.monthLabel}>{monthLabel}</Text>

        {/* Week Calendar */}
        <View>
          <WeekCalendar
            style={{
              height: 350,
              padding: 5,
              elevation: 0,
              shadowColor: "transparent",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0,
              shadowRadius: 0,
            }}
            firstDay={1}
            markedDates={markedDates} // Add the orange dot
            onDayPress={(day) => setSelectedDate(day.dateString)} // Set the selected date on press
          />
        </View>

        {/* Render Events */}
        <View style={styles.container}>
          <FlatList
            data={filteredEvents} // Use filtered events for display
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderEvent}
          />
        </View>
      </ScrollView>
    </CalendarProvider>
  );
};

export default CalendarScreen;
