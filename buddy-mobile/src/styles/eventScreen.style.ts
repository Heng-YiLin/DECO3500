import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  body: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    backgroundColor: "white",
    width: "100%",
  },
  bodyBottom: {
    flexGrow: 1,
    paddingBottom: 20,
    justifyContent: "flex-end",
    padding: 25,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: -30,
  },
  title: {
    fontSize: 36, // Increased font size for the title
    fontWeight: "bold",
    color: "#274766", // Dark blue for title color
    flex: 1,
  },
  dateTimeContainer: {
    justifyContent: "center",
    alignItems: "center", // Center align the date and time components
    padding: 10,
    marginRight: 10, // Add margin to keep it aligned with the right edge
  },
  dateBox: {
    backgroundColor: "#D6E4FF", // Light blue background for the date number
    padding: 5,
    paddingHorizontal: 10, // Ensure consistent width for all dates
    borderRadius: 8,
    marginBottom: 4,
  },
  dateNumber: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1F5EBF", // Dark blue for the number
  },
  dateMonth: {
    fontSize: 16,
    fontWeight: "bold", // Make the month bold
    color: "#1F5EBF", // Dark blue for the month
  },
  dateTime: {
    fontSize: 14,
    color: "black", // Regular black for time
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    fontWeight: "bold", // Make the location bold
    color: "#407FDC",
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    width: "100%",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "gray",
  },
  button: {
    backgroundColor: "#407FDC",
    padding: 10,
    borderRadius: 30,
    marginTop: 10,
    width: "50%",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 10,
    borderRadius: 50,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFF", // Or any other background color
  },
  
});

export default styles;
