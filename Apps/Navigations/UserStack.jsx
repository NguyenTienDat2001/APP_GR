import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen from '../Screens/UserScreen';
import RentScreen from '../Screens/RentScreen';
import ChapterScreen from '../Screens/ChapterScreen';
import BookmarkScreen from '../Screens/BookmarkScreen';
import ProfileScreen from '../Screens/ProfileScreen';
const Stack = createNativeStackNavigator();
export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="UserStack" component={UserScreen} options={{ title: 'Người dùng' }} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Thông tin người dùng' }} />
            <Stack.Screen name="RentScreen" component={RentScreen} options={{ title: 'Sách đã thuê' }}  />
            <Stack.Screen name="ChapterScreen" component={ChapterScreen} options={{ title: 'Thông tin truyện' }} />
            <Stack.Screen name="BookmarkScreen" component={BookmarkScreen} options={{ title: 'Bookmark' }} />
        </Stack.Navigator>

    );
}