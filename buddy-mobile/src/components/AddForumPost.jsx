import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/addForumPost.style"; // Import styles

function AddForumPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const navigation = useNavigation();

  const handleAddPost = () => {
    // Placeholder function for adding the forum post
    navigation.goBack();
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
