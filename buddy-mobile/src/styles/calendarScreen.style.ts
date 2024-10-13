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
  header: {
    fontSize: 40,
    fontWeight: "bold",
    paddingTop: 100,
    paddingBottom: 30,
    paddingLeft: 20,
  },
  searchBarContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F8",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchIcon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#274766",
    marginTop: 10,
  },
  categoriesContainer: {
    paddingLeft: 20,
    paddingVertical: 10,
    flexDirection: "row",
  },
  categoryButton: {
    backgroundColor: "#F2F2F7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#274766",
  },
  selectedCategoryButton: {
    backgroundColor: "#407FDC",
  },
  selectedCategoryText: {
    color: "#FFFFFF",
  },
  eventCard: {
    backgroundColor: "#EFF5FC",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#274766",
  },
  sectionSub: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  plusIconContainer: {
    position: "absolute",
    top: 110, // Align with the header
    right: 20, // Top-right corner
    backgroundColor: "#FFFFFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },
  monthLabel: {
    fontSize: 16,
    color: "#274766",
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "500",
  },
});

export default styles;
