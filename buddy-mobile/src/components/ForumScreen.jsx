import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons for the add icon
import styles from "../styles/forumScreen.style";
import {
  fetchAllForumPosts,
  fetchAllCategories,
  fetchDistinctCategories,
} from "../api/api"; // Import the API calls

function Forum() {
  const [forumPosts, setForumPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]); // All categories for filtering
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track selected category
  const flatListRef = useRef(null); // Ref for FlatList

  const navigation = useNavigation();

  // Fetch forum posts and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await fetchAllForumPosts(); // Fetch all forum posts
        const fetchedCategories = await fetchAllCategories(); // Fetch all post categories
        const distinctCategories = await fetchDistinctCategories(); // Fetch distinct categories

        setForumPosts(posts); // Set forum posts data
        setCategories(fetchedCategories); // Set all categories related to posts
        setAllCategories([
          ...new Set(distinctCategories.map((item) => item.category_name)),
        ]); // Extract unique categories
      } catch (error) {
        console.error("Error fetching forum data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle selecting/deselecting a category for filtering
  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      // If the selected category is clicked again, reset it to show all posts
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
    // Scroll to the top of the FlatList
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  // Navigate to add a new forum post
  const handleAddForumPress = () => {
    navigation.navigate("AddForumPost"); // Example route for adding a new post
  };

  // Calculate "X Days Ago"
  const calculateDaysAgo = (created_at) => {
    const currentDate = new Date();
    const postDate = new Date(created_at);
    const timeDifference = Math.abs(currentDate - postDate);
    const daysAgo = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return daysAgo;
  };

  // Filter posts based on selected category
  const filteredPosts = selectedCategory
    ? forumPosts.filter((post) =>
        categories.some(
          (cat) => cat.post_id === post.id && cat.category_name === selectedCategory
        )
      )
    : forumPosts;

  // Render each forum card with its tags (categories)
  const renderForumCard = ({ item }) => {
    const postCategories = categories
      .filter((cat) => cat.post_id === item.id)
      .map((cat) => cat.category_name); // Get categories for this post

    const daysAgo = calculateDaysAgo(item.created_at); // Calculate how many days ago the post was created

    return (
      <TouchableOpacity
        style={styles.forumCard}
        onPress={() => navigation.navigate("ForumPost", { forumId: item.id })}
      >
        <Text style={styles.forumTitle}>{item.headline}</Text>
        <Text style={styles.forumMeta}>
          ● {daysAgo} Days Ago ● {item.comment_count} responses
        </Text>

        {/* Render categories/tags under each forum post */}
        <View style={styles.tagContainer}>
          {postCategories.map((category, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{category}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  // Render distinct categories for filtering
  const renderCategoryFilter = () => (
    <FlatList
      data={allCategories}
      horizontal={true} // Enable horizontal scrolling
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoriesContainer}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === item && styles.selectedCategoryButton, // Style the selected category
          ]}
          onPress={() => handleCategorySelect(item)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === item && styles.selectedCategoryText, // Style the selected category
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#407FDC" />
        <Text>Loading forums...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forum</Text>

      {/* Add Icon Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddForumPress}>
        <Ionicons name="add" size={30} color="#407FDC" />
      </TouchableOpacity>

      {/* Forum Categories Filter */}
      <Text style={styles.subHeader}>Forum Categories</Text>
      {renderCategoryFilter()}

      {/* Forum list */}
      <FlatList
        ref={flatListRef} // Set the ref to the FlatList
        data={filteredPosts}
        renderItem={renderForumCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.forumList}
      />
    </View>
  );
}

export default Forum;
