import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTask = ({ navigation, addTask }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleSave = () => {
    if (title.trim().length > 0) {
      const formattedDate = date.toLocaleDateString('de-DE');
      addTask(title, formattedDate);
      navigation.navigate('Tasks');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Text style={styles.header}>Add New Task</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Task Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="What's on your mind today?" 
          value={title} 
          onChangeText={setTitle} 
        />
        
        <Text style={styles.label}>Due Date</Text>
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShow(true)}>
          <Text style={styles.datePickerText}>{date.toLocaleDateString('de-DE')}</Text>
        </TouchableOpacity>

        {show && (
          <DateTimePicker 
            value={date} 
            mode="date" 
            display={Platform.OS === 'ios' ? 'spinner' : 'default'} 
            onChange={onChange} 
            minimumDate={new Date()} 
          />
        )}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Create Task</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    fontSize: 18,
    marginBottom: 25,
    paddingVertical: 8,
  },
  datePickerButton: {
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    marginBottom: 25,
  },
  datePickerText: {
    fontSize: 18,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTask;