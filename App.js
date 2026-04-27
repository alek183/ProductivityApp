import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStackNavigator from './src/navigation/StackNavigator';
import FlashMessage from "react-native-flash-message";
import { StatusBar } from 'expo-status-bar';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  let [fontsLoaded] = useFonts({
    'Roboto-Regular': Roboto_400Regular,
    'Roboto-Bold': Roboto_700Bold,
  });

  const theme = {
    isDarkMode,
    bg: isDarkMode ? '#121212' : '#F8F9FA',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    subText: isDarkMode ? '#A1A1A6' : '#666666',
    border: isDarkMode ? '#333333' : '#EEEEEE',
    primary: '#007AFF',
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('@task_list_data');
        const savedTheme = await AsyncStorage.getItem('@is_dark_mode');
        if (savedTasks !== null) setTasks(JSON.parse(savedTasks));
        if (savedTheme !== null) setIsDarkMode(JSON.parse(savedTheme));
      } catch (e) { console.error(e); }
    };
    loadData();
  }, []);

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem('@is_dark_mode', JSON.stringify(newMode));
  };

  const addTask = (title, date) => {
    const newTask = { id: Math.random().toString(), title, date };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };


  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#121212' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: theme.bg } }}>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        <MainStackNavigator 
          tasks={tasks} 
          addTask={addTask} 
          deleteTask={deleteTask} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
        <FlashMessage position="top" />
      </NavigationContainer>
    </View>
  );
}