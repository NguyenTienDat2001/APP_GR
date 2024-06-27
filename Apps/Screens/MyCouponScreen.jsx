import { View, Text, FlatList, Image, TouchableOpacity, Button, Clipboard } from 'react-native'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Domain from '../Components/Domain';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import axios from 'axios';
export default function MyCouponScreen() {
    const navigation = useNavigation()
    const [gifts, setGifts] = useState([]);
    useFocusEffect(
        React.useCallback(() => {
            getGifts();
        }, [])
    );
    const getGifts = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${Domain.domainUrl}/coupons/mycoupon`, {
                headers: {
                    'Authorization': token
                },
            });
            setGifts(response.data.coupon);
            console.log(response.data.coupon);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const renderItem = ({ item }) => (
        <View className=' px-1 bg-white mb-2 p-2'>
            <View className='flex flex-row items-center justify-between gap-3 px-1'>
                <View className=' flex flex-row items-center gap-2'>
                <View>
                    <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bRzciTEx-kD8yfyjNL4M2BNdiih8gISAIw&usqp=CAU' }} style={{ height: 100, width: 70, backgroundColor: 'rgba(217, 217, 217, 0.23)' }} />
                </View>
                <View>
                    <Text selectable={true} style={{ fontWeight: 'bold', fontSize: 14 }}>{item.code}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{item.des}</Text>
                    {item.condition && <Text>{item.condition}đ</Text>}
                </View>
                </View>
                <View className='flex flex-col items-end'>
                    {/* <Text>{moment(item.start_date).format('DD-MM-YYYY')}</Text>
                    <Text>{moment(item.end_date).format('DD-MM-YYYY')}</Text> */}
                    {item.status === "1" && <Text className=' text-green-500'>Chưa sử dụng</Text>}
                    {item.status === "2" && <Text className=' text-red-500'>Đã sử dụng</Text>}
                </View>
            </View>

        </View>
    );
    return (
        <View className='pt-2 px-3'>
            <FlatList
                data={gifts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}