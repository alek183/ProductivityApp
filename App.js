import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStackNavigator from './src/navigation/StackNavigator';

export default function App() {
  const [tasks, setTasks] = useState([]); 

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('@my_project_tasks');
        if (savedTasks !== null) {

          setTasks(JSON.parse(savedTasks));
        }
      } catch (e) {
        console.error("Failed to load tasks:", e);
      }
    };

    loadTasks();
  }, []); 

  useEffect(() => {
    const saveTasks = async () => {
      try {

        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem('@my_project_tasks', jsonValue);
      } catch (e) {
        console.error("Failed to save tasks:", e);
      }
    };


    if (tasks.length > 0) {
      saveTasks();
    }
  }, [tasks]); 


  const addTask = (text) => {
    const newEntry = { id: Math.random().toString(), title: text };
    setTasks([...tasks, newEntry]);
  };

  return (
    <NavigationContainer>
      <MainStackNavigator tasks={tasks} addTask={addTask} />
    </NavigationContainer>
  );
}