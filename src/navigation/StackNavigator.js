import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from "../screens/Home";
import Tasks from "../screens/Tasks";
import AddTask from "../screens/AddTask";
import Timer from "../screens/Timer";

const Stack = createStackNavigator();

// Prihvatamo tasks i addTask iz App.js
const MainStackNavigator = ({ tasks, addTask }) => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />

        {/* Ekran za listu - šaljemo mu listu taskova */}
        <Stack.Screen name="Tasks">
          {(props) => <Tasks {...props} tasks={tasks}/>}
        </Stack.Screen>

        {/* Ekran za dodavanje - šaljemo mu funkciju za dodavanje */}
        <Stack.Screen name="AddTask">
          {(props) => <AddTask {...props} addTask={addTask}/>}
        </Stack.Screen>

        <Stack.Screen name="Timer" component={Timer}/>
    </Stack.Navigator>
);

export default MainStackNavigator;