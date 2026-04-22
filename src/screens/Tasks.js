import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Primamo 'tasks' koje smo poslali iz StackNavigatora
const Tasks = ({ navigation, tasks }) => { 
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Tasks</Text>

      {/* FlatList je najbolji način za prikazivanje listi u React Native-u */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskText}>{item.title}</Text>
          </View>
        )}
        style={styles.list}
      />

      <TouchableOpacity 
        style={styles.floatingButton} 
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 60,
  },
  header: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    width: '100%',
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2, // Sjena za Android
    shadowColor: '#000', // Sjena za iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  taskText: {
    fontSize: 18,
    color: '#333',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 80,
    right: 30,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});

export default Tasks;