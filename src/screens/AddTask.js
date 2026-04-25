import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { showMessage } from "react-native-flash-message";
import { Audio } from 'expo-av';

const AddTask = ({ navigation, addTask }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../components/freddy.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.log("Sound problem:", error);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleSave = () => {
    if (title.trim().length > 0) {
      const diffInMS = date.getTime() - Date.now();

      if (diffInMS > 0) {
        setTimeout(async () => {
          await playSound();

          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const timeString = `${hours}:${minutes}`;

          showMessage({
            message: title,
            description: `${timeString}`,
            type: "info",
            backgroundColor: "#007AFF",
            color: "#ffffff",
            duration: 7000,
            floating: true,
            style: { 
              marginTop: 50,
              borderRadius: 15,
              marginHorizontal: 15
            },
          });
        }, diffInMS);
      }
      
      const formattedDate = date.toLocaleDateString('de-DE'); 
      const formattedTime = date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
      
      addTask(title, `${formattedDate} | ${formattedTime}`);
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
        
        <Text style={styles.label}>Due Date & Time</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.datePickerButton} onPress={() => { setShow(true); setMode('date'); }}>
            <Text style={styles.datePickerText}>{date.toLocaleDateString('de-DE')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.datePickerButton} onPress={() => { setShow(true); setMode('time'); }}>
            <Text style={styles.datePickerText}>
              {date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </TouchableOpacity>
        </View>

        {show && (
          <DateTimePicker 
            value={date} 
            mode={mode} 
            is24Hour={true}
            display="default" 
            onChange={onChange} 
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
  container: { flex: 1, padding: 30, backgroundColor: '#fff', justifyContent: 'center' },
  header: { fontSize: 36, fontWeight: 'bold', marginBottom: 40, textAlign: 'center', marginTop: -60 },
  inputContainer: { marginBottom: 30 },
  label: { fontSize: 14, color: '#007AFF', fontWeight: 'bold', marginBottom: 5 },
  input: { borderBottomWidth: 2, borderBottomColor: '#eee', fontSize: 18, marginBottom: 25, paddingVertical: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  datePickerButton: { paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: '#eee', flex: 0.45, alignItems: 'center' },
  datePickerText: { fontSize: 16, color: '#333' },
  saveButton: { backgroundColor: '#007AFF', padding: 18, borderRadius: 15, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default AddTask;