import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white', // Set the background color to white
      },
    safeArea: {
        flex: 1,
        backgroundColor: '#F4F4F4',
      },
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 20,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 25,
    paddingTop:30,
    borderTopLeftRadius: 30,    // Apply radius to the top-left corner
    borderTopRightRadius: 30, 
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    paddingTop:120,
    paddingBottom:70,
    paddingLeft:40,
    color: "#1F3A6E",
    width:"100%",
    backgroundColor:"#C9C9C9",
    marginBottom: -30,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  iconContainer: {
    alignItems: 'center',
  },
  profileName: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  profiles: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
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
