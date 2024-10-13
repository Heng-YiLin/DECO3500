import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { fetchForumPost, fetchReplies, postForumComment } from "../api/api"; // API calls for fetching and posting
import styles from "../styles/forumPost.style"; // Import styles

function ForumPost() {
  const route = useRoute();
  const navigation = useNavigation();
  const { forumId } = route.params;

  const [forum, setForum] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const forumData = await fetchForumPost(forumId);
        const repliesData = await fetchReplies(forumId);

        setForum(forumData || {});
        setReplies(repliesData || []);
      } catch (error) {
        console.error("Error fetching forum post or replies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [forumId]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddReply = async () => {
    if (newReply.trim() !== "") {
      try {
        // Get the logged-in user data from AsyncStorage
        const loggedinuser = await AsyncStorage.getItem("loggedInUser");
        const user = JSON.parse(loggedinuser);
        const userId = user?.id;
        console.log("user: ", user);
        console.log("userID: ", userId);
        console.log("loggeduserID: ", loggedinuser);
  
        // Log the correct values being passed
        console.log("Submitting reply with postId:", forumId, "userId:", userId, "commentText:", newReply);
  
        // Call postForumComment with the correct parameters
        await postForumComment(forumId, userId, newReply);
  
        // Update the local replies array with the new reply
        const newReplyObj = {
          id: replies.length + 1,
          name: user?.name || "You", // Use the logged-in user's name or fallback to "You"
          comment_text: newReply,
        };
  
        setReplies([...replies, newReplyObj]);
        setNewReply(""); // Clear the input field after adding the reply
      } catch (error) {
        console.error("Error submitting reply:", error);
      }
    }
  };
  

  const getDaysAgo = (date) => {
    if (!date) return "Unknown";
    const createdDate = new Date(date);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} Days Ago`;
  };

  const data = [
    { type: "forum", forum },
    { type: "repliesCount", count: replies.length },
    ...replies.map((reply) => ({ type: "reply", ...reply })),
    { type: "input" },
  ];

  const renderItem = ({ item }) => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#407FDC" />
          <Text style={styles.loadingText}>Loading forum post...</Text>
        </View>
      );
    }

    if (item.type === "forum") {
      if (!item.forum || Object.keys(item.forum).length === 0) {
        return (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Forum post not found.</Text>
          </View>
        );
      }

      return (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{item.forum.headline || "No Title"}</Text>
          <Text style={styles.author}>Posted by {item.forum.user_name || "Unknown User"}</Text>
          <Text style={styles.date}>{getDaysAgo(item.forum.created_at)}</Text>

          <FlatList
            data={item.forum.categories || []}
            renderItem={({ item: category }) => (
              <View style={styles.hcard}>
                <Text style={styles.sectionCategories}>{category}</Text>
              </View>
            )}
            keyExtractor={(category, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />

          <Text style={styles.description}>{item.forum.description || "No Description"}</Text>
          <Text style={styles.reportLink}>! Report inappropriate content</Text>
        </View>
      );
    } else if (item.type === "repliesCount") {
      return (
        <View style={styles.repliesHeader}>
          <Text style={styles.sectionTitle}>{`Replies (${item.count})`}</Text>
        </View>
      );
    } else if (item.type === "reply") {
      return (
        <View style={[styles.card, styles.replyCard]}>
          <Text style={styles.sectionTitle}>{item.name || "Unknown User"}</Text>
          <Text style={styles.description}>{item.comment_text || "No Comment"}</Text>
          <Text style={styles.reportLink}>! Report inappropriate content</Text>
        </View>
      );
    } else if (item.type === "input") {
      return (
        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            placeholder="Message..."
            value={newReply}
            onChangeText={(text) => setNewReply(text)}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleAddReply}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 0}
    >
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Ionicons name="arrow-back-circle-outline" size={40} color="#274766" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ForumPost;
