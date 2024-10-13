import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center", // Center content horizontally
    paddingTop: 140, // Start content lower on the screen
  },
  card: {
    backgroundColor: "#F4E0D1",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0, // Ensuring shadow appears evenly on both sides
      height: 4,
    },
    shadowOpacity: 0.3, // Slightly increased for more emphasis
    shadowRadius: 5, // Increased radius to make the shadow more prominent
    elevation: 8, // Slightly higher elevation for Android
    width: width * 0.9, // Set the width to 90% of the screen
    marginHorizontal: 10, // Adding margin on both sides for shadow visibility
  },
  replyCard: {
    backgroundColor: "#FFFFFF", // White background for replies
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0, // Ensuring shadow appears evenly on both sides
      height: 4,
    },
    shadowOpacity: 0.3, // Slightly increased for more emphasis
    shadowRadius: 5, // Increased radius to make the shadow more prominent
    elevation: 8, // Slightly higher elevation for Android
    width: width * 0.9, // Match width for replies (90% of the screen)
    marginHorizontal: 10, // Adding margin on both sides for shadow visibility
  },
  backButton: {
    position: "absolute",
    top: 80, // Lowered by an additional 20px
    left: 20,
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
    color: "#274766",
  },
  author: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  hcard: {
    backgroundColor: "#f0f0f0", // Category card background
    margin: 10,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  sectionCategories: {
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
  },
  description: {
    lineHeight: 25,
    marginBottom: 10,
    color: "#333",
  },
  inputCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: width * 0.9, // Match the width of the forum post and reply cards (90%)
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    padding: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#C7DAFF", // Light blue to match the app's aesthetic
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#274766", // Dark blue text
    fontSize: 16,
    fontWeight: "600",
  },
  reportLink: {
    color: "orange",
    textAlign: "left",
    fontSize: 10,
    fontWeight: "bold",
    textDecorationLine: "underline",
    paddingVertical: 10,
  },
  repliesHeader: {
    paddingBottom: 10,
  },
  loadingText: {
    fontSize: 14,
    color: "#000",
    marginTop: 10,
  },
  flatListContainer: {
    paddingBottom: 100,
    alignItems: "center", // Center FlatList content horizontally
  },
});

export default styles;
