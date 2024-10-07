import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white', // Set the background color to white
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    marginBottom: -30,
  },
  headerImg: {
    width: "100%",
  },
  greeting: {
    color: "white",
    fontSize: 40,
    position: "absolute",
    alignSelf: "center",
    top: "35%",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0", 
    paddingHorizontal: 10, // Space for the icon inside the input
    borderRadius: 30,
    height: 50,
    alignSelf:"center",
    top:"65%",
    width:"85%",
    position:"absolute",
  },
  searchIcon: {
    marginRight: 3, 
    marginLeft:8,
  },
  searchBar: {
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  homeBody: {
    borderTopLeftRadius: 30,    // Apply radius to the top-left corner
    borderTopRightRadius: 30, 
    padding: 25,
    backgroundColor: "white",
  },
  section: {
    marginBottom: 20,
    
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    
  },
  button: {
    backgroundColor: "#407FDC",
    padding: 10,
    borderRadius: 30,
    marginTop: 10,
    width:"50%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  eventRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  eventCard: {
    width: "48%",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
  },
  eventImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buddyUpdates: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#BBD0EF",
    padding: 15,
    borderRadius: 20,
    marginBottom:20,
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 1,  // Horizontal shadow offset
      height: 4, // Vertical shadow offset
    },
    shadowOpacity: 0.25,   // Shadow transparency
    shadowRadius: 3.84,    // Shadow blur radius
    // Android Elevation
    elevation: 5, // Elevation for Android (higher value means more elevation)
  },
});

export default styles;
