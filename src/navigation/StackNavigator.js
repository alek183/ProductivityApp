import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Tasks from '../screens/Tasks';
import AddTask from '../screens/AddTask';
import Timer from '../screens/Timer';
import Settings from '../screens/Settings';

const Stack = createNativeStackNavigator();

const MainStackNavigator = ({ tasks, addTask, deleteTask, theme, toggleTheme }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.bg }, animation: 'fade' }}>
      <Stack.Screen name="Home">
        {(props) => <Home {...props} theme={theme} />}
      </Stack.Screen>
      
      <Stack.Screen name="Tasks">
        {(props) => <Tasks {...props} tasks={tasks} deleteTask={deleteTask} theme={theme} />}
      </Stack.Screen>

      <Stack.Screen name="AddTask">
        {(props) => <AddTask {...props} addTask={addTask} theme={theme} />}
      </Stack.Screen>

      <Stack.Screen name="Timer">
        {(props) => <Timer {...props} theme={theme} />}
      </Stack.Screen>

      <Stack.Screen name="Settings">
        {(props) => <Settings {...props} theme={theme} toggleTheme={toggleTheme} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainStackNavigator;