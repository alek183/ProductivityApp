import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStackNavigator from './src/navigation/StackNavigator';
import FlashMessage from "react-native-flash-message";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('@task_list_data');
        if (savedTasks !== null) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem('@task_list_data', jsonValue);
      } catch (e) {
        console.error(e);
      }
    };
    saveTasks();
  }, [tasks]);

  const addTask = (title, date) => {
    const newTask = { 
      id: Math.random().toString(), 
      title: title, 
      date: date || 'No date'
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <NavigationContainer>
      <MainStackNavigator 
        tasks={tasks} 
        addTask={addTask} 
        deleteTask={deleteTask} 
      />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}