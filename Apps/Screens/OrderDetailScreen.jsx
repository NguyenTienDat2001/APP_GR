import { View, Text, FlatList, Image } from 'react-native'
import { useRoute, useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import axios from 'axios';
import Domain from '../Components/Domain';
export default function OrderDetailScreen() {
    const { params } = useRoute()
    const orderId = params.orderId
    const [books, setBooks] = useState()
    useFocusEffect(
        React.useCallback(() => {
            getBooks();
        }, [])
    );

    const getBooks = async () => {
        try {
            const response = await axios.get(`${Domain.domainUrl}/orders/${orderId}`);
            setBooks(response.data.books);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const renderItem = ({ item }) => (
        <View className=' bg-white mb-2'>
            <View className='flex flex-row items-center gap-3 px-2 py-2'>
                <View>
                    <Image source={{ uri: item.img }} style={{ height: 100, width: 50, backgroundColor: 'rgba(217, 217, 217, 0.23)' }} />

                </View>
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, width: 200 }}>{item.name}</Text>
                    <Text style={{ width: 200 }}>Tác giả: {item.author}</Text>
                </View>
                <View className='flex gap-1 items-center'>
                    <Text className='text-red-400 font-bold'>{item.sell_price}đ</Text>
                    <Text className='font-bold'>Số lượng {item.quantity}</Text>
                </View>
            </View>
        </View>
    );
    return (
        <View>
            <View className='px-3 pt-8 pb-10'>
                <FlatList
                    data={books}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>

    )
}