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
    fontSize: 36,
    fontWeight: "bold",
    color: "#274766",
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
});

export default styles;
