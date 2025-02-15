// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Apps/Screens/LoginScreen';
import SignupScreen from './Apps/Screens/SignupScreen';
import HomeScreen from './Apps/Screens/HomeScreen';
import Tabvavigation from './Apps/Navigations/Tabvavigation';
import { useEffect } from 'react';
import { Linking } from 'react-native';
const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Homepage" component={Tabvavigation} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;