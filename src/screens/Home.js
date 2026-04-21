import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => { 
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>

      {/* Task button */}

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Tasks')}
      >
        <Text style={styles.buttonText}>Tasks</Text>
      </TouchableOpacity>

      {/* AddTask button */}

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>

      {/* Timer button */}

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Timer')}
      >
        <Text style={styles.buttonText}>Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 48,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default Home;