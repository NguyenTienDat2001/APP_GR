import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function UserScreen() {
    const navigation = useNavigation()

    return (
        <View className='px-5 pt-[40px] flex flex-col gap-3'>
            <View className=' bg-white pl-3'>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                    <Text className='text-lg'>Trang cá nhân</Text>
                </TouchableOpacity>
            </View>
            <View className=' bg-white pl-3'>
                <TouchableOpacity onPress={() => navigation.navigate('BookmarkScreen')}>
                    <Text className='text-lg'>Yêu thích</Text>
                </TouchableOpacity>
            </View>
            <View className=' bg-white pl-3'>
                <TouchableOpacity onPress={() => navigation.navigate('RentScreen')}>
                    <Text className='text-lg'>Sách đã thuê</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}