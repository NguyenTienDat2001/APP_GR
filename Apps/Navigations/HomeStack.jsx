import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import DetailScreen from '../Screens/DetailScreen';
const Stack = createNativeStackNavigator();
export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeStack" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Chi tiết' }} />
        </Stack.Navigator>

    );
}