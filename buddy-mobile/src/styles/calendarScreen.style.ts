import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 25,
    paddingTop: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    paddingTop: 120,
    paddingBottom: 70,
    paddingLeft: 40,
    width: "100%",
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
  },
  profiles: {
    paddingVertical: 10,
    alignItems: "center", // Center the items in the carousel
  },
  iconContainer: {
    justifyContent: 'center', // Center the icon vertically
    alignItems: 'flex-end', // Align icon to the right
  },
  profileName: {
    marginTop: 5,
    textAlign: "center",
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
    marginBottom: 20,
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 1, // Horizontal shadow offset
      height: 4, // Vertical shadow offset
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
    flexDirection: 'row', // Set flex direction to row
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', 
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  calendarDates: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  dateContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDate: {
    backgroundColor: "#ccc",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventsContainer: {
    flex: 1,
    padding: 20,
  },
  event: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  eventImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventTime: {
    fontSize: 14,
    color: "#666",
  },
  eventStatus: {
    fontSize: 14,
    color: "#666",
  },
  
});

export default styles;
