import * as React from "react";
import { Ionicons } from "@expo/vector-icons"; // If using Expo for icons
import styles from "../styles/formScreen.style";
import { Button } from "react-native-paper";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';

const ForumScreen = () => {
  const navigation = useNavigation();

  const forums = [
    {
      id: 1,
      title: "Help! Finding Costume",
      time: "3 hours ago",
      responseCount: "3 responses",
      categories: "Category 1, Category 2, Category 3",
    },
    {
      id: 2,
      title: "Help! Costume",
      time: "3 hours ago",
      responseCount: "3 responses",
      categories: "Category 1, Category 2, Category 3",
    },
  ];
  const categories = [
    {
      id: 1,
      title: "Popular",
    },
    {
      id: 2,
      title: "Upcoming event",
    },
  ];

  // Render each forum item
  const renderForumItem = ({ item }) => (
    <TouchableOpacity style={styles.card}   onPress={() => navigation.navigate('Forum', { id: item.id })}>
      <Text style={styles.sectionTitle}>{item.title}</Text>
      <Text style={styles.forumTime}>{item.time}</Text>
      <Text style={styles.forumResponses}>{item.responseCount}</Text>
      <Text style={styles.forumCategories}>{item.categories}</Text>
    </TouchableOpacity>
  );

  const renderCategories = ({ item }) => (
    <TouchableOpacity style={styles.hcard}>
      <Text style={styles.sectionCategories}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forum</Text>
      <View style={styles.bodyContainer}>
        <Text style={styles.sectionTitle}>Forum Categories</Text>
        <View  style={[{ paddingVertical:20}] }>
          <FlatList
            data={categories} // Array of categories
            renderItem={renderCategories} // Render function for each category item
            keyExtractor={(item) => item.id.toString()} // Unique key for each category
            horizontal // Enables horizontal scrolling
            showsHorizontalScrollIndicator={false} // Hides horizontal scroll indicator
            contentContainerStyle={styles.categoriesContainer} // Style for the overall list
          />
        </View>

        <FlatList
          data={forums} // Pass the forum array
          keyExtractor={(item) => item.id.toString()} // Unique key for each forum
          renderItem={renderForumItem} // Render function for each forum item
          showsVerticalScrollIndicator={false} // Disable the vertical scroll indicator
        />
      </View>
    </View>
  );
};

export default ForumScreen;
