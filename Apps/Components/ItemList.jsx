import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Domain from './Domain';
import axios from 'axios';
export default function ItemList({ books, getBooks }) {
    const navigation = useNavigation()
    // const [books, setBooks] = useState([])
    // useEffect(() => {
    //     getBooks()
    // }, [])
    // const getBooks = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('token');
    //         const response = await axios.get(`${Domain.domainUrl}/books`, {
    //             headers: {
    //                 'Authorization': token
    //             },
    //         });
    //         setBooks(response.data.books)
    //         // console.log(response.data.books);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };
    const addCart = async (book_id) => {
        // const user_id = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('token');
        const formdata = {
            // user_id: user_id, 
            book_id: book_id,
            quantity: 1
        };

        console.log('formdata', formdata);

        axios.post(`${Domain.domainUrl}/cart/add`, formdata, {
            headers: {
                'Authorization': token
            },
        })
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
                    <View className='flex-1 m-2 p-1 justify-around w-[200px] h-[300px] border-[1px] border-red-400 rounded-md'>
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
                                <Text className='text-red-400 font-bold text-base pr-1 m-0'>{item.sell_price}đ</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                                <TouchableOpacity onPress={() => addCart(item.id)} style={{ backgroundColor: 'red', padding: 8 }}>
                                    <Text className='font-bold text-white'>Mua ngay</Text>
                                </TouchableOpacity>

                                {item.isbookmark ?
                                    <View>
                                        <AntDesign name="heart" size={24} color="red" onPress={() => handleRed(item.id)} />
                                    </View>
                                    :
                                    <View>
                                        <FontAwesome6 name="heart" size={24} color='black' onPress={() => handleBlack(item.id)} />
                                    </View>}
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}