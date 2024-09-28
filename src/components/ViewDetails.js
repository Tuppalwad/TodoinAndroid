import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';

const ViewDetails = () => {
  const route = useRoute();
  const { tasks, selectedDate } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Tasks for {
      moment(selectedDate).format('MMMM Do, YYYY')
      }</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
      
    </View>
  );
};

export default ViewDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
