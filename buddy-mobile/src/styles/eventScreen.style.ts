import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  body:{
    borderTopLeftRadius: 30, // Apply radius to the top-left corner
    borderTopRightRadius: 30,
    padding: 25,
    backgroundColor: "white",
    width: "100%",
    
  },
  bodyBottom: {
    flexGrow: 1, // Allows the body to grow and take remaining space
    justifyContent: "flex-end",    // Center horizontally
    paddingBottom:20,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: -30,
    
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: "gray",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  agendaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  agendaItem: {
    fontSize: 16,
    marginVertical: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    width: "100%",
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
});

export default styles;
