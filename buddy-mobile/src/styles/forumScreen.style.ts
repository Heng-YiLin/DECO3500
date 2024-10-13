// forumScreen.style.js or .ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 120,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#274766',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#274766',
    marginBottom: 10,
  },
  categoriesContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 8,
    elevation: 3, // For drop shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedCategoryButton: {
    backgroundColor: '#E48022', // Different color for selected category
  },
  categoryText: {
    fontSize: 14,
    color: '#274766',
    fontWeight: 'bold',
  },
  selectedCategoryText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  forumList: {
    paddingVertical: 20,
  },
  forumCard: {
    backgroundColor: '#BBD0EF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000', // For drop shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  forumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#274766',
    marginBottom: 5,
  },
  forumMeta: {
    fontSize: 14,
    color: '#274766',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 12,
    color: '#274766',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: "absolute",
    top: 150,
    right: 20,
    backgroundColor: "#FFF",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default styles;
