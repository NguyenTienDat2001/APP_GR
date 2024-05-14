import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CouponScreen from '../Screens/CouponScreen';
import MyCouponScreen from '../Screens/MyCouponScreen';
import GiftScreen from '../Screens/GiftScreen';
const Stack = createNativeStackNavigator();
export default function CouponStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CouponStack" component={CouponScreen} options={{ title: 'Coupon' }} />
            <Stack.Screen name="MyCouponScreen" component={MyCouponScreen} options={{ title: 'My coupon' }} />
            <Stack.Screen name="GiftScreen" component={GiftScreen} options={{ title: 'Qùa tặng' }}  />
        </Stack.Navigator>

    );
}