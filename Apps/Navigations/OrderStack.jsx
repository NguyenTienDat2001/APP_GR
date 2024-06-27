import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from '../Screens/OrderScreen';
import OrderDetailScreen from '../Screens/OrderDetailScreen';
const Stack = createNativeStackNavigator();
export default function OrderStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="OrderStack" component={OrderScreen} options={{ title: 'Lịch sử đơn hàng' }} />
            <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} options={{ title: 'Thông tin đơn hàng' }} />
        </Stack.Navigator>

    );
}