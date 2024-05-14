import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function CouponScreen() {
    const navigation = useNavigation()

    return (
        <View className='px-5 pt-[40px] flex flex-col gap-3'>
            <View className=' bg-white pl-3'>
                <TouchableOpacity onPress={() => navigation.navigate('GiftScreen')}>
                    <Text className='text-lg'>Đổi thưởng</Text>
                </TouchableOpacity>
            </View>
            <View className=' bg-white pl-3'>
                <TouchableOpacity onPress={() => navigation.navigate('MyCouponScreen')}>
                    <Text className='text-lg'>Coupon của bạn</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}