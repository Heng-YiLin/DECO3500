import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    header: {
      marginBottom: 20,
    },
    headerImg: {
        width:"100%",
      },
    greeting: {
        color:"white",
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
      position:"absolute",
      alignSelf:"center",
      top: "50%"
    },
    searchBar: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      borderRadius: 10,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: '#ff8c8c',
      padding: 10,
      borderRadius: 10,
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    eventRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    eventCard: {
      width: '48%',
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 10,
    },
    eventImage: {
      width: '100%',
      height: 100,
      borderRadius: 10,
      marginBottom: 10,
    },
    sectionHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    buddyUpdates: {
      marginBottom: 20,
    },
    buddyCard: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
  });
  
export default styles;
