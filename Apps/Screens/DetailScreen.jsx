import { View, Text, ScrollView, Image, Button, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Domain from '../Components/Domain';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
export default function DetailScreen() {
  const [book, setBook] = useState('')
  const [quantity, setQuantity] = useState('1');
  const [isExpanded, setIsExpanded] = useState(false);
  const [des, setDes] = useState()
  const { params } = useRoute()

  const bookId = params.bookId
  const { width } = useWindowDimensions()
  useEffect(() => {
    getBook()
  }, []);
  const getBook = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`${Domain.domainUrl}/books/${bookId}`, {
        headers: {
          'Authorization': token
        },
      });
      setBook(res.data.book)
      setDes(res.data.book.description)
      console.log(res.data.book.description)
      console.log(typeof res.data.book.description)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleChange = (value) => {
    setQuantity(value);
    // console.log(typeof(value));
  };

  const handleDecrement = () => {
    setQuantity((prev) => (parseInt(prev) >= 2 ? (parseInt(prev) - 1).toString() : '1'));
  };

  const handleIncrement = () => {
    setQuantity((prev) => (parseInt(prev) + 1).toString());
  };
  return (
    <ScrollView className='px-1 py-50'>
      <Text className='mx-auto font-bold text-xl pb-3 pt-3'>{book.name}</Text>
      <Image source={{ uri: book.img }}
        className='w-[200px] h-[300px] mx-auto' />
      <View className='flex flex-row justify-between items-center'>
        <View className=' pt-2' >
          <Text className=' text-sm'>NXB: <Text className='font-bold'>NXB {book.publisher}</Text></Text>
          <Text className=' text-sm'>Tác giả: <Text className='font-bold'>{book.author}</Text></Text>
          <Text className=' text-sm'>Thể loại: <Text className='font-bold'>{book.category}</Text></Text>
        </View>
        <View className='flex items-center gap-0'>
          <View className='flex flex-row items-center py-3'>
            <Text className='text-red-600 font-medium text-lg pr-1 m-0'>{book.sell_price}đ</Text>
            <Text className='text-gray-600 text-sm pr-1 line-through'>{book.sell_price + 5000}đ</Text>
            <Text className='text-white text-xs p-0 mr-1 bg-red-600'>15%</Text>
          </View>
          <View className='flex flex-row gap-1 items-center justify-center'>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
              <TouchableOpacity
                style={{ height: 30, width: 25, borderRadius: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}
                onPress={() => handleDecrement()}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>-</Text>
              </TouchableOpacity>
              <TextInput className=' flex items-center text-center h-[30px] w-12 bg-gray-100 border-[1px] border-black'
                defaultValue={quantity}
                onChangeText={handleChange} />
              <TouchableOpacity
                style={{ height: 30, width: 25, borderRadius: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}
                onPress={() => handleIncrement()}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>+</Text>
              </TouchableOpacity>
            </View>
            <View className='flex flex-row'>
              <TouchableOpacity style={{ height: 30, width: 45, borderRadius: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
                <Text style={{ color: 'white' }}>Mua</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View style={{ flex: 1 }}>
          <RenderHtml
            contentWidth={width}
            source={{
              html: des
            }}
            tagsStyles={{
              p: {
                // overflow: 'hidden',
                lineHeight: 25, 
                height: isExpanded ? 'none' : 82,
                fontSize: 16
              }
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => setIsExpanded(!isExpanded)}
          style={{
            backgroundColor: 'red',
            padding: 5,
            width: 150, 
            alignItems: 'center',
            borderRadius: 5,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>
            {isExpanded ? 'Ẩn bớt...' : 'Xem thêm...'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}