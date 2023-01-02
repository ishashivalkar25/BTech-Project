import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Index from './Components/Index';
import HomePage from './Components/HomePage';
import AddIncome from './Components/AddIncome';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen  name="Home" component={Home} />
        <Stack.Screen  name="HomePage" component={HomePage} />
        <Stack.Screen  name="AddIncome" component={AddIncome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
