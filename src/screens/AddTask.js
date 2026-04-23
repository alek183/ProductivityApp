import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const AddTask = ({ navigation, addTask }) => { 
  const [text, setText] = useState(''); 

  const handleSave = () => {
    if (text.length > 0) {
      addTask(text); 
      setText('');   
      navigation.navigate('Tasks'); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Task</Text>

      <TextInput 
        style={styles.input}
        placeholder="What do you want to do?"
        value={text}
        onChangeText={(val) => setText(val)}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Task</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
    fontSize: 20,
    paddingVertical: 10,
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backText: {
    color: '#888',
    textAlign: 'center',
    fontSize: 16,
  }
});

export default AddTask;