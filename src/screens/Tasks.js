import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const Tasks = ({ navigation, tasks, deleteTask }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Schedule</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <View style={styles.textContainer}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDate}>{item.date}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButton}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 4,
  },
  textContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  taskDate: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 4,
  },
  deleteButton: {
    color: '#FF3B30',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007AFF',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  fabText: {
    color: '#fff',
    fontSize: 35,
    fontWeight: '300',
  },
});

export default Tasks;