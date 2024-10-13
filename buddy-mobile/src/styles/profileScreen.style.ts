import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Light shadowed circle
    padding: 10,
    borderRadius: 50,
  },
  logoutButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Same style as back button
    padding: 10,
    borderRadius: 50,
  },
  image: {
    width: "100%",
    height: 400,
    marginBottom: -30,
  },
  body: {
    padding: 25,
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#407FDC",
    marginLeft: 4,
  },
  descriptionContainer: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "gray",
  },
  agendaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  buddyButton: {
    position: 'absolute', // Fix the button in a specific position
    bottom: 30, // Move it up from the bottom
    right: 30, // Move it left from the right
    backgroundColor: '#C7DAFF', // Light blue background color for visibility
    paddingVertical: 12, // Add vertical padding to make the button bigger
    paddingHorizontal: 20, // Add horizontal padding
    borderRadius: 25, // Make the button rounded
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.25, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow blur radius for iOS
  },
  
  buddyButtonText: {
    fontSize: 18, // Increase the font size
    color: '#274766', // Dark blue color for the text
    fontWeight: '600', // Semi-bold font weight
    textAlign: 'center', // Center the text
  },
  
  
});

export default styles;
