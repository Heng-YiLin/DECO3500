import React, { useState } from "react"; // This is how we import `useState` from React
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from "../styles/form.style";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons


const forums = [
  {
    id: 2,
    title: "Help! Finding Costume",
    date: "29 Sep",
    categories: "book fair, characters",
    content:
      "libero inceptos habitasse ex. Augue mauris sapien porta cubilia pharetra facilisi posuere dictum. Placera Mollis Erat Liberos tibus",
    likes: 5,
  },
  {
    id: 1,
    title: "Favourite Books for Prep?",
    date: "29 Sep",
    categories: "book fair, characters",
    content:
      "I’m feeling a bit stressed about the upcoming Book Week Parade. I love the idea of encouraging kids to get into reading, but I’m starting to worry about the pressure around the costumes...",
    likes: 5,
  },
];

const categories = [
  { id: 1, title: "Popular" },
  { id: 2, title: "Upcoming forum" },
];

const initialReplies = [
  {
    id: 1,
    title: "Help! Finding Costume",
    user: "Lucy Smith",
    content:
      "Totally agree! I wish the school would remind parents that it's about fun, not a costume competition. Last year I stressed over it, but this time I'm keeping it simple – we’re doing a DIY costume using stuff we already have at home!",
  },
  {
    id: 2,
    title: "Help! Costume",
    user: "Nisha Late",
    content:
      "Totally agree! I wish the school would remind parents that it's about fun, not a costume competition. Last year I stressed over it, but this time I'm keeping it simple – we’re doing a DIY costume using stuff we already have at home!",
  },
];
function Forum() {
  const route = useRoute();
  const { id } = route.params;
  const forum = forums.find((e) => e.id === id);
  const navigation = useNavigation();

  // State to manage the replies and the new reply content
  const [replies, setReplies] = useState(initialReplies);
  const [newReply, setNewReply] = useState("");

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Function to handle reply submission
  const handleAddReply = () => {
    if (newReply.trim() !== "") {
      const newReplyObj = {
        id: replies.length + 1, 
        user: "You", 
        content: newReply,
      };
      setReplies([...replies, newReplyObj]);
      setNewReply(""); 
    }
  };

  // Combine the forum content and replies into a single data structure
  const data = [
    { type: "forum", forum }, 
    { type: "repliesCount", count: replies.length }, 
    ...replies.map((reply) => ({ type: "reply", ...reply })), 
    { type: "input" }, 
  ];

  // Render function for each item
  const renderItem = ({ item }) => {
    if (item.type === "forum") {
      return (
        <View style={{ flex: 1 }}>
   <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Ionicons name="arrow-back-circle-outline" size={40} color="black" />
      </TouchableOpacity>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>{item.forum.title}</Text>
            <Text style={styles.date}>
              {item.forum.date} | {item.forum.time}
            </Text>
            <FlatList
              data={categories}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.hcard}>
                  <Text style={styles.sectionCategories}>{item.title}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <Text style={styles.description}>{item.forum.content}</Text>
            <Text
              style={{
                color: "orange",
                textAlign: "left",
                fontSize: 10,
                fontWeight: "bold",
                textDecorationLine: "underline",
                paddingVertical: 10,
              }}
            >
              ! Report inappropriate content
            </Text>
          </View>
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
        <View style={[styles.card, { backgroundColor: "#FFFFFF" }]}>
          <Text style={styles.sectionTitle}>{item.user}</Text>
          <Text style={styles.description}>{item.content}</Text>
          <Text
            style={{
              color: "orange",
              textAlign: "left",
              fontSize: 10,
              fontWeight: "bold",
              textDecorationLine: "underline",
              paddingVertical: 10,
            }}
          >
            ! Report inappropriate content
          </Text>
        </View>
      );
    } else if (item.type === "input") {
      return (
        <View style={styles.inputCard}>
          <TextInput
              style={[styles.input, { borderBottomWidth: 1, borderBottomColor: 'gray',padding:10,fontSize:16 }]}
            placeholder="Message..."
            value={newReply}
            onChangeText={(text) => setNewReply(text)}
          />
          <Button title="Submit" onPress={handleAddReply} />
        </View>
      );
    }
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.categoriesContainer}
    />
  );
}

export default Forum;
