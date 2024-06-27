import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../Screens/CartScreen';
import AddOrderScreen from '../Screens/AddOrderScreen';

const Stack = createNativeStackNavigator();
export default function CartStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CartStack" component={CartScreen} options={{ title: 'Giỏ hàng' }} />
            <Stack.Screen name="AddOrderScreen" component={AddOrderScreen} options={{ title: 'Tạo đơn hàng' }} />
        </Stack.Navigator>

    );
}