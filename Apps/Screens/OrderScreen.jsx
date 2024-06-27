import { View, Text, FlatList, Image, TouchableOpacity, Button, Linking } from 'react-native'
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
    const cancelOrder = (order_id) => {
        const data = {
            order_id: order_id,
        };
        axios.post(`${Domain.domainUrl}/orders/cancel`, data)
            .then(result => {
                console.log(result);
                getOrders();
            })
            .catch(error => {
                console.error(error);
            })
    }
    const renderItem = ({ item }) => (
        <View className=' px-1 bg-white mb-3 p-2 rounded-md'>
            <View className='flex flex-row items-center justify-between gap-3 px-1'>
                <View>
                    <Image source={{ uri: 'https://imaxmobile.vn/media/data/icon-giao-hang-toan-quoc.jpeg' }} style={{ height: 100, width: 100, backgroundColor: 'rgba(217, 217, 217, 0.23)' }} />
                </View>
                <View>
                    <Text>Mã:{item.id.toString().padStart(4, '0')}   <Text className=' font-bold'>{item.account}đ</Text> </Text>
                    <Text>Ngày tạo: {moment(item.createdAt).format('DD-MM-YYYY')}</Text>
                    {item.status == 0 && (<Text className='' style={{ color: 'green' }}>Đã hoàn thành</Text>)}
                    {item.status == 1 && (
                        <View>
                            <Text className='' style={{ color: 'blue' }}>Đang xử lý</Text>
                            <TouchableOpacity onPress={() => cancelOrder(item.id)}>
                                <Text className=' text-red-500 underline'>Hủy đơn hàng</Text>
                            </TouchableOpacity>
                        </View>

                    )}
                    {item.status == 1 && !item.ispay && (
                        <View>

                            <TouchableOpacity onPress={() => handlePayment(item)}>
                                <Text className=' text-green-500 underline'>Thanh toán</Text>
                            </TouchableOpacity>
                        </View>

                    )}
                    {item.status == 2 && (<Text className='' style={{ color: 'red' }}>Đã hủy</Text>)}

                </View>
                <View>
                    <Button onPress={() => navigation.navigate('OrderDetailScreen', { orderId: item.id })} title='Xem' />
                </View>
            </View>

        </View>
    );
    const generateRandomCode = (length) => {
        const characters = '0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    const handlePayment = (order) => {
        const data = {
            order_id: generateRandomCode(8),
            history_id: order.id,
            total_price: order.account,
        };
        console.log(data);
        axios.post(`${Domain.domainUrl}/payment`, data)
            .then(result => {
                console.log(result);
                // window.location.href = result.data;
                openURL(result.data)

            })
            .catch(error => {
                console.error(error);
            })
    }
    const openURL = (url) => {
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(url);
                } else {
                    Alert.alert(`Không thể mở URL: ${url}`);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };
    return (
        <View className='pt-3 px-3'>
            {/* <Text className=' text-xl pb-3 font-bold'>Danh sách đơn hàng</Text> */}
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}