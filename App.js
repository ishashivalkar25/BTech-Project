import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity, View , StatusBar} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import Index from "./Components/Index";
import HomePage from "./Components/HomePage";
import AddIncome from "./Components/AddIncome";
import AddExpense from "./Components/AddExpense";
import Header from "./Components/Header";
import Visualisation from "./Components/Visualisation";
import {SafeAreaProvider} from 'react-native-safe-area-context'

const Stack = createNativeStackNavigator();


export default function App() {
    
  return (
    <SafeAreaProvider>
      {/* <StatusBar></StatusBar> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{
              headerTitle: () => <Header></Header>,
              headerRight: () => (
                <View>
                  <TouchableOpacity >
                    <Image
                      source={require("./assets/log-out.png")}
                      style={{ width: 27, height: 27, alignSelf: "center" }}
                    />
                  </TouchableOpacity>
                </View>
              ),
              headerStyle: {
                height: 150,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                backgroundColor: "pink",
                shadowColor: "#000",
                elevation: 25,
              },
            }}
          />
          <Stack.Screen name="AddIncome" component={AddIncome} />
          <Stack.Screen name="AddExpense" component={AddExpense} />
          <Stack.Screen name="Visualisation" component={Visualisation} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
