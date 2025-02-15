import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white", // Set the background color to white
  },
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    padding: 16,
  },
  header: {
    marginBottom: -30,
  },
  headerImg: {
    width: "100%",
  },
  greeting: {
    color: "#274766",
    fontWeight: "bold",
    fontSize: 40,
    position: "absolute",
    alignSelf: "center",
    top: "25%",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10, // Space for the icon inside the input
    borderRadius: 30,
    height: 50,
    alignSelf: "center",
    top: "65%",
    width: "85%",
    position: "absolute",
  },
  searchIcon: {
    marginRight: 3,
    marginLeft: 8,
  },
  searchBar: {
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  homeBody: {
    borderTopLeftRadius: 30, // Apply radius to the top-left corner
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
    width: "50%",
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 1, // Horizontal shadow offset
      height: 4, // Vertical shadow offset
    },
    shadowOpacity: 0.25, // Shadow transparency
    shadowRadius: 3.84, // Shadow blur radius
    // Android Elevation
    elevation: 5,
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
  },carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 25,

  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 0,
    margin:10,
    alignItems: 'center',
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 1, // Horizontal shadow offset
      height: 4, // Vertical shadow offset
    },
    shadowOpacity: 0.25, // Shadow transparency
    shadowRadius: 3.84, // Shadow blur radius
    // Android Elevation
    elevation: 5, 
    
  },
  eventImage: {
    width: 250,
    height: 150,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bottomEventCard:{
    backgroundColor: 'transparent',
    padding:5,
  }
});

export default styles;
