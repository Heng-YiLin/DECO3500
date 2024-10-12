import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between', 
  },
  body: {
    alignItems: "center", // Center horizontally
    flexGrow: 1, // Allows the body to grow and take remaining space
    justifyContent: "flex-end",    // Center horizontally
    paddingBottom:20,
  },
  title: {
    paddingTop: 150,
    fontSize: 40,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 40,
  },
  input: {
    width: "100%",
    backgroundColor: "#f0f0f0",

    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 1,  // Horizontal shadow offset
      height: 3, // Vertical shadow offset
    },
    shadowOpacity: 0.25,   // Shadow transparency
    shadowRadius: 3.84,    // Shadow blur radius
    // Android Elevation
    elevation: 5, 
  },
  button: {
    backgroundColor: "#407FDC",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    width:"80%",
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 1,  // Horizontal shadow offset
      height: 3, // Vertical shadow offset
    },
    shadowOpacity: 0.25,   // Shadow transparency
    shadowRadius: 3.84,    // Shadow blur radius
    // Android Elevation
    elevation: 5, 
  },
  buttonText: {
    color:"white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign:"center",
  },
  bottomText: {
    fontSize: 12, // Adjusted for better readability
    padding:10,
    fontWeight: "bold",
    textAlign: "center", // Centered for better alignment
  },
    linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: "#007BFF", // Link color for "Register"
    fontWeight: "bold",
  },
});

export default styles;
