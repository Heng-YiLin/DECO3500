import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import styles from "../styles/addForumPost.style"; // Import styles
import { addForumPost, addForumPostCategory, getLatestForumPostByUser } from "../api/api"; // Import API calls

function AddForumPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState(null); // Default state for userId

  const navigation = useNavigation();

  // Fetch userId from AsyncStorage on component mount
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("loggedInUser");
        console.log("loggedInuserL ", storedUser);
        if (storedUser !== null) {
          const parsedUser = JSON.parse(storedUser); // Parse the JSON string
          setUserId(parsedUser.id); // Access the 'id' from the parsed user object
        } else {
          console.error("User data not found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching user data from AsyncStorage:", error);
      }
    };

    fetchUserId();
  }, []);

  // Function to handle form submission
  const handleAddPost = async () => {
    try {
      if (!title || !description || !category) {
        Alert.alert('Error', 'Please fill in all fields before submitting.');
        return;
      }
  
      // Step 1: Add the forum post
      const postResponse = await addForumPost(title, description, userId);
      
      // Step 2: Fetch the latest forum post created by the user
      const latestPost = await getLatestForumPostByUser(userId);
      const postId = latestPost.id;  // Extract postId from the latest post
  
      // Step 3: Add the category to the forum_post_categories table
      const categoryResponse = await addForumPostCategory(postId, category);
  
      Alert.alert('Success', 'Forum post has been added!');
      navigation.goBack();
    } catch (error) {
      console.error("Error adding forum post:", error);
      Alert.alert('Error', 'Failed to add forum post. Please try again.');
    }
  };  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* Description Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
        />
      </View>

      {/* Categories Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categories</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter categories"
          value={category}
          onChangeText={setCategory}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleAddPost}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default AddForumPost;
