import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker'; // For date and time picking
import styles from "../styles/addEventScreen.style"; // Separate stylesheet
import { getEventCategories, publishEvent } from "../api/api"; // Function to fetch event categories

const AddEventScreen = () => {
    const navigation = useNavigation();
    const [eventName, setEventName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [description, setDescription] = useState('');
    const [agenda, setAgenda] = useState('');
    const [location, setLocation] = useState('');
    const [visibility, setVisibility] = useState('everyone'); // Default to everyone
    const [categories, setCategories] = useState([]); // Event categories from API
    const [selectedCategory, setSelectedCategory] = useState(''); // Selected category

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    // Fetch categories on mount
    useEffect(() => {
        async function fetchCategories() {
            try {
                const fetchedCategories = await getEventCategories(); // Fetch categories from API
                setCategories(fetchedCategories.map(cat => cat.category_name)); // Map to category names
            } catch (error) {
                console.error("Error fetching event categories:", error);
            }
        }
        fetchCategories();
    }, []);

    // Inside AddEventScreen component

    const handlePublishEvent = async () => {
        if (!eventName || !description || !agenda || !selectedCategory || !startDate || !startTime) {
            Alert.alert('Error', 'Please fill in all required fields before publishing.');
            return;
        }

        // Construct event data to send to the backend
        const eventData = {
            name: eventName,
            location: location,
            start_date: startDate.toISOString().split("T")[0], // Format date to YYYY-MM-DD
            start_time: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }), // Format to 24h time
            end_date: endDate.toISOString().split("T")[0], // Format date to YYYY-MM-DD
            end_time: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }), // Format to 24h time
            description: description,
            agenda: agenda,
            category_id: categories.findIndex(cat => cat === selectedCategory) + 1, // Map the category to its index (1-based)
            accessibility_group_id: visibility === 'everyone' ? 1 : visibility === 'buddies' ? 2 : 3, // Map visibility to a group id
        };

        try {
            const response = await publishEvent(eventData); // API call to publish the event
            if (response) {
                Alert.alert('Success', 'Event has been published!');
                navigation.goBack(); // Navigate back after publishing
            }
        } catch (error) {
            Alert.alert('Error', 'There was an issue publishing the event.');
            console.error('Error publishing event: ', error);
        }
    };


    return (
        <ScrollView style={styles.container}>
            {/* Event Name */}
            <Text style={styles.label}>Event Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter event name"
                value={eventName}
                onChangeText={setEventName}
            />

            {/* Location */}
            <Text style={styles.label}>Location</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter event location"
                value={location}
                onChangeText={setLocation}
                multiline={true}
            />

            {/* Start Date */}
            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.input}>
                <Text>{startDate.toDateString()}</Text>
            </TouchableOpacity>
            {showStartDatePicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, date) => {
                        setShowStartDatePicker(false);
                        if (date) setStartDate(date);
                    }}
                />
            )}

            {/* Start Time */}
            <Text style={styles.label}>Start Time</Text>
            <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.input}>
                <Text>{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</Text>
            </TouchableOpacity>
            {showStartTimePicker && (
                <DateTimePicker
                    value={startTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(event, time) => {
                        setShowStartTimePicker(false);
                        if (time) setStartTime(time);
                    }}
                />
            )}

            {/* End Date */}
            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.input}>
                <Text>{endDate.toDateString()}</Text>
            </TouchableOpacity>
            {showEndDatePicker && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, date) => {
                        setShowEndDatePicker(false);
                        if (date) setEndDate(date);
                    }}
                />
            )}

            {/* End Time */}
            <Text style={styles.label}>End Time</Text>
            <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.input}>
                <Text>{endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</Text>
            </TouchableOpacity>
            {showEndTimePicker && (
                <DateTimePicker
                    value={endTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(event, time) => {
                        setShowEndTimePicker(false);
                        if (time) setEndTime(time);
                    }}
                />
            )}

            {/* Description */}
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter event description"
                value={description}
                onChangeText={setDescription}
                multiline={true}
            />

            {/* Agenda */}
            <Text style={styles.label}>Agenda</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter event agenda"
                value={agenda}
                onChangeText={setAgenda}
                multiline={true}
            />

            {/* Who Can See It */}
            <Text style={styles.label}>Who Can See It</Text>
            <View style={styles.input}>
                <TouchableOpacity onPress={() => setVisibility('everyone')}>
                    <Text style={visibility === 'everyone' ? styles.selectedOption : styles.option}>Everyone</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setVisibility('buddies')}>
                    <Text style={visibility === 'buddies' ? styles.selectedOption : styles.option}>Buddies</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setVisibility('private')}>
                    <Text style={visibility === 'private' ? styles.selectedOption : styles.option}>Private</Text>
                </TouchableOpacity>
            </View>

            {/* Event Categories */}
            <Text style={styles.label}>Event Categories</Text>
            <View style={styles.input}>
                <TouchableOpacity onPress={() => setSelectedCategory('')}>
                    {categories.map((category, index) => (
                        <TouchableOpacity key={index} onPress={() => setSelectedCategory(category)}>
                            <Text style={selectedCategory === category ? styles.selectedOption : styles.option}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </TouchableOpacity>
            </View>

            {/* Publish Button */}
            <TouchableOpacity style={styles.publishButton} onPress={handlePublishEvent}>
                <Text style={styles.publishButtonText}>Publish Event</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddEventScreen;
