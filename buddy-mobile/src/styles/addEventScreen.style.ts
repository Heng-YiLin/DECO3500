import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#274766",
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#F3F4F8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  option: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  selectedOption: {
    fontSize: 16,
    color: "#274766",
    fontWeight: "bold",
    marginBottom: 5,
  },
  publishButton: {
    backgroundColor: "#407FDC",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 50,
  },
  publishButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
