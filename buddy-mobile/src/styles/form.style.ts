import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 120,
  },
  body: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    paddingTop: 120,
    paddingBottom: 70,
    paddingLeft: 40,
    color: "#1F3A6E",
    width: "100%",
    backgroundColor: "#C9C9C9",
    marginBottom: -30,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  profiles: {
    paddingVertical: 10,
    alignItems: "center", // Center the items in the carousel
  },
  iconContainer: {
    alignItems: "center",
    marginHorizontal: 10, // Space between items
  },
  profileName: {
    marginTop: 5,
    textAlign: "center",
  },
  avatar: {
    backgroundColor: "#ECECEC",
  },
  button: {
    backgroundColor: "#C7DAFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#F4E0D1",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 1, // Horizontal shadow offset
      height: 4, // Vertical shadow offset
    },
    shadowOpacity: 0.25, // Shadow transparency
    shadowRadius: 3.84, // Shadow blur radius
    // Android Elevation
    elevation: 5, // Elevation for Android (higher value means more elevation)
  },
  hcard: {
    backgroundColor: "#f0f0f0", // Example background
    padding: 10,
    marginHorizontal: 5, // Space between cards horizontally
    borderRadius: 20,
  },
  sectionCategories: {
    fontSize: 12,
    color: "#333", // Text color
    fontWeight: "bold",
  },
  categoriesContainer: {
    paddingTop: 100,
    paddingHorizontal: 25,
  },
  description: {
    lineHeight: 25,
  },
  backButton: {
    width: 40,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 10, // Space below the button
  },
});

export default styles;
