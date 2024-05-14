import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Domain from './Domain';
import axios from 'axios';
export default function ItemList() {
    const navigation = useNavigation()
    const [books, setBooks] = useState([])
    useEffect(() => {
        getBooks()
    }, [])
    const getBooks = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${Domain.domainUrl}/books`, {
                headers: {
                    'Authorization': token
                },
            });
            setBooks(response.data.books)
            // console.log(response.data.books);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const addCart = async (book_id) => {
        const user_id = await AsyncStorage.getItem('userId');
        const formdata = {
            user_id: user_id, // Thay thế user_id_here bằng giá trị thực tế
            book_id: book_id,
            quantity: 1
        };

        console.log('formdata', formdata);

        axios.post(`${Domain.domainUrl}/cart/add`, formdata)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    handleRed = async (book_id) => {
        const token = await AsyncStorage.getItem('token');
        const formdata = {
            book_id: book_id,
        };

        console.log('formdata', formdata);

        axios.delete(`${Domain.domainUrl}/books/bookmark/${book_id}`, {
            headers: {
                'Authorization': token
            },
        })
            .then(res => {
                console.log(res.data);
                getBooks()
            })
            .catch(error => {
                console.error(error);
            });
    }
    handleBlack = async (book_id) => {
        const token = await AsyncStorage.getItem('token');
        const formdata = {
            book_id: book_id,
        };

        console.log('formdata', formdata);

        axios.post(`${Domain.domainUrl}/books/bookmark`, formdata, {
            headers: {
                'Authorization': token
            },
        })
            .then(res => {
                console.log(res.data);
                getBooks()
            })
            .catch(error => {
                console.error(error);
            });
    }
    return (
        <View className='mt-3 mb-3'>
            <FlatList
                horizontal={true}
                data={books}
                //   numColumns={2}
                renderItem={({ item, index }) => (
                    <View className='flex-1 m-2 p-1 justify-around w-[200px] h-[300px] border-[1px] border-red-400 rounded-sm'>
                        <TouchableOpacity onPress={() => navigation.navigate('Detail', { bookId: item.id })}>
                            <View className='card-top hover:cursor-pointer' >
                                <Image source={{ uri: item.img }}
                                    className='w-full h-[170px] mx-auto' />
                                <Text style={{ fontSize: 14, color: 'black' }} numberOfLines={1}>{item.name}</Text>
                                <Text style={{ fontSize: 14, color: 'black' }} numberOfLines={1}>{item.author}</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <View className='flex flex-row items-center'>
                                <Text className='text-red-400 text-sm pr-1 m-0'>{item.sell_price}đ</Text>
                                <Text className='text-gray-400 text-xs pr-1 line-through'>{item.buy_price}đ </Text>
                                <Text className='text-white text-[8px] p-0 bg-red-600 w-6 flex items-center justify-center'>{Math.floor((1 - item.sell_price / item.buy_price) * 100)}%</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                                <TouchableOpacity onPress={() => addCart(item.id)} style={{ backgroundColor: 'red', padding: 8 }}>
                                    <Text style={{ color: 'white' }}>Mua ngay</Text>
                                </TouchableOpacity>
                                {/* <FontAwesome6 name="heart" size={24} color="black" /> */}
                                <FontAwesome6 name="heart" size={24} color={item.isbookmark ? 'red' : 'black'} onPress={() => item.isbookmark ? handleRed(item.id) : handleBlack(item.id)} />
                            </View>
                        </View>
                    </View>
                )

                }
            />
        </View>
    )
}