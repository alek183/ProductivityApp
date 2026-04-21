import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from "../screens/Home";
import Tasks from "../screens/Tasks";
import AddTask from "../screens/AddTask";
import Timer from "../screens/Timer";

const Stack = createStackNavigator();

const MainStackNavigator = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen name = "Home" component={Home}/>
        <Stack.Screen name = "Tasks" component = {Tasks}/>
        <Stack.Screen name = "AddTask" component = {AddTask}/>
        <Stack.Screen name = "Timer" component = {Timer}/>
    </Stack.Navigator>
);

export default MainStackNavigator;