import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStackNavigator from './src/navigation/StackNavigator';

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('@task_data');
        if (savedTasks !== null) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (e) {
        console.error("Failed to load tasks", e);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem('@task_data', jsonValue);
      } catch (e) {
        console.error("Failed to save tasks", e);
      }
    };
    saveTasks();
  }, [tasks]);

  // Add
  const addTask = (text, Date) => {
    const newTask = { id: Math.random().toString(), title: text, dueDate: Date, completed: false };
    setTasks([...tasks, newTask]);
  };

  // Delete
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Update 
  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <NavigationContainer>
      <MainStackNavigator 
        tasks={tasks} 
        addTask={addTask} 
        deleteTask={deleteTask} 
        toggleTaskStatus={toggleTaskStatus} 
      />
    </NavigationContainer>
  );
}