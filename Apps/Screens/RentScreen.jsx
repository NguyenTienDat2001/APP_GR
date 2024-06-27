import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Domain from '../Components/Domain';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
export default function RentScreen() {
    const navigation = useNavigation()
    const [books, setBooks] = useState([]);
    useFocusEffect(
        React.useCallback(() => {
            getBooks(); 
        }, [])
    );
    const getBooks = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          const response = await axios.get(`${Domain.domainUrl}/books/borrow/list`, {
            headers: {
              'Authorization': token
            },
          });
          setBooks(response.data.books);
          console.log(response.data.books);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    const renderItem = ({ item }) => (
        <View className=' px-1 bg-white mb-2 p-2 rounded-md'>
            <TouchableOpacity onPress={() => navigation.navigate('ChapterScreen', { bookId: item.book_id })}>
          <View className='flex flex-row items-center gap-3 px-1'>
            <View>
              <Image source={{ uri: item.img }} style={{ height: 100, width: 70, backgroundColor: 'rgba(217, 217, 217, 0.23)' }} />
    
            </View>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 14, width: 200 }}>{item.name}</Text>
              <Text style={{ width: 200 }}>Tác giả: {item.author}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, paddingBottom: 5 }}>
              </View>
            </View>
          </View>
            </TouchableOpacity>
        </View>
      );
  return (
    <View className='pt-2 px-3'>
      <FlatList
            data={books}
            renderItem={renderItem}
            keyExtractor={(item) => item.book_id.toString()}
          />
    </View>
  )
}