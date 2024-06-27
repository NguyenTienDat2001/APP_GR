import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import HomeScreen from '../Screens/HomeScreen';
import CartScreen from '../Screens/CartScreen';
import OrderScreen from '../Screens/OrderScreen';
import CouponScreen from '../Screens/CouponScreen';
import UserScreen from '../Screens/UserScreen';
import HomeStack from './HomeStack';
import CartStack from './CartStack';
import UserStack from './UserStack';
import CouponStack from './CouponStack';
import OrderStack from './OrderStack';
import { FontAwesome, Entypo, FontAwesome5,FontAwesome6, AntDesign } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
export default function Tabvavigation() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen name="HomeTab" component={HomeStack} options={{
        tabBarLabel: ({ color }) => (
          <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Home</Text>
        ),
        tabBarIcon: ({ size, color }) => (
          <FontAwesome name="home" size={24} color="grey" />
        )
      }} />
      <Tab.Screen name="Cart" component={CartStack} options={{
        tabBarLabel: ({ color }) => (
          <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Cart</Text>
        ),
        tabBarIcon: ({ size, color }) => (
          <Entypo name="shopping-cart" size={24} color="grey" />
        ),
      }} />
      <Tab.Screen name="Coupon" component={CouponStack} options={{
        tabBarLabel: ({ color }) => (
          <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Coupon</Text>
        ),
        tabBarIcon: ({ size, color }) => (
          <FontAwesome5 name="money-bill-wave" size={24} color="grey" />
        )
      }} />
      <Tab.Screen name="Order" component={OrderStack} options={{
        tabBarLabel: ({ color }) => (
          <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Order</Text>
        ),
        tabBarIcon: ({ size, color }) => (
          <FontAwesome6 name="calendar-alt" size={24} color="grey" />
        )
      }} />
      <Tab.Screen name="User" component={UserStack} options={{
        tabBarLabel: ({ color }) => (
          <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>User</Text>
        ),
        tabBarIcon: ({ size, color }) => (
          <Entypo name="user" size={24} color="grey" />
        )
      }} />
    </Tab.Navigator>
  )
}