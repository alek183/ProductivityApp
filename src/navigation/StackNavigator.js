import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from "../screens/Home";
import Tasks from "../screens/Tasks";
import AddTask from "../screens/AddTask";
import Timer from "../screens/Timer";

const Stack = createStackNavigator();

const MainStackNavigator = ({ tasks, addTask, deleteTask }) => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Tasks">
          {(props) => <Tasks {...props} tasks={tasks} deleteTask={deleteTask} />}
        </Stack.Screen>
        <Stack.Screen name="AddTask">
          {(props) => <AddTask {...props} addTask={addTask} />}
        </Stack.Screen>
        <Stack.Screen name="Timer" component={Timer} />
    </Stack.Navigator>
);

export default MainStackNavigator;