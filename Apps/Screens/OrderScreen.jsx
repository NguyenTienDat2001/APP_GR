import { View, Text, FlatList, Image, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Domain from '../Components/Domain';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import axios from 'axios';
export default function OrderScreen() {
    const navigation = useNavigation()
    const [orders, setOrders] = useState([]);
    useFocusEffect(
        React.useCallback(() => {
            getOrders();
        }, [])
    );
    const getOrders = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${Domain.domainUrl}/orders`, {
                headers: {
                    'Authorization': token
                },
            });
            setOrders(response.data.orders);
            console.log(response.data.orders);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const renderItem = ({ item }) => (
        <View className=' px-1 bg-white mb-2 p-2'>
            <View className='flex flex-row items-center justify-between gap-3 px-1'>
                <View>
                    <Image source={{ uri: 'https://imaxmobile.vn/media/data/icon-giao-hang-toan-quoc.jpeg' }} style={{ height: 100, width: 100, backgroundColor: 'rgba(217, 217, 217, 0.23)' }} />
                </View>
                <View>
                    <Text>Mã đơn hàng:{item.id}</Text>
                    <Text>Ngày đặt: {moment(item.createdAt).format('DD-MM-YYYY')}</Text>
                    <Text className=' text-green-500'>Đã thanh toán</Text>
                </View>
                <View>
                <Button onPress={() => navigation.navigate('OrderDetailScreen', { orderId: item.id })} title='Xem'/>
                </View>
            </View>

        </View>
    );
    return (
        <View className='pt-8 px-3'>
          <Text className=' text-xl pb-3 font-bold'>Danh sách đơn hàng</Text>
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}