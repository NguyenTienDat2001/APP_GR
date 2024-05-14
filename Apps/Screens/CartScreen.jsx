import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Button, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Domain from '../Components/Domain';
import { useFocusEffect } from '@react-navigation/native';

export default function CartScreen() {
  const [books, setBooks] = useState([]);
  const [totalitem, setTotalitem] = useState(0)
  const [total, setTotal] = useState(0)
  const [newtotal, setNewtotal] = useState(total)
  const [coupon, setCoupon] = useState()
  const [errMess, setErrMess] = useState()
  useFocusEffect(
    React.useCallback(() => {
        getBooks(); 
    }, [])
);

  const getBooks = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${Domain.domainUrl}/cart`, {
        headers: {
          'Authorization': token
        },
      });
      setBooks(response.data.data);
      console.log(response.data.data);
      let x = response.data.data.reduce((acc, book) => acc + (book.price * book.quantity), 0)
      let y = response.data.data.reduce((acc, book) => acc + (book.quantity), 0)
      console.log(x);
      console.log(y);
      setTotal(x)
      setNewtotal(x)
      setTotalitem(y)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleIncrement = (book_id) => {
    // Xử lý tăng số lượng
  };

  const handleDecrement = (book) => {
    // Xử lý giảm số lượng
  };

  const deleteCart = (book_id) => {
    // Xử lý xóa khỏi giỏ hàng
  };
  const handleApply = () => {
    // Xử lý áp dụng mã giảm giá
  };

  const handlePayment = () => {
    // Xử lý thanh toán
  }

  const renderItem = ({ item }) => (
    <View className=' px-1 bg-white mb-2'>
      <View className='flex flex-row items-center gap-3 px-1'>
        <View>
          <Image source={{ uri: item.img }} style={{ height: 100, width: 50, backgroundColor: 'rgba(217, 217, 217, 0.23)' }} />

        </View>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 14, width: 200 }}>{item.name}</Text>
          <Text style={{ width: 200 }}>Tác giả: {item.author}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, paddingBottom: 5 }}>
            <TouchableOpacity onPress={() => deleteCart(item.book_id)} style={{ color: 'blue', textDecorationLine: 'underline' }}>
              <Text className='text-blue-500 underline'>Xóa</Text>
            </TouchableOpacity>
            <Text> | </Text>
            <Text className='text-blue-500 underline'>Thêm yêu thích</Text>
          </View>
        </View>
        <View className='flex gap-1 items-center'>
          <Text>{item.price}đ</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
            <TouchableOpacity
              style={{ height: 30, width: 25, borderRadius: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}
              onPress={() => handleDecrement()}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={{ borderWidth: 1, borderColor: 'gray', width: 25, height: 30, padding: 5, textAlign: 'center' }}
              onChangeText={(text) => handleQuantityChange(item, text)}
              value={item.quantity.toString()}
            />
            <TouchableOpacity
              style={{ height: 30, width: 25, borderRadius: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}
              onPress={() => handleIncrement()}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView behavior='padding'
    style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View className='px-5 pt-[40px] pb-20'>
          <Text className=' font-bold text-xl pb-2'>Giỏ hàng của bạn</Text>
          <View style={{ paddingTop: 2, marginBottom: 4, width: '100%', backgroundColor: 'white', marginTop: 2, borderRadius: 10, flexDirection: 'column', justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, gap: 4 }}>
            <View><Text className=' text-center'>{totalitem} sản phẩm</Text></View>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 16, paddingRight: 8, gap: 4 }}>
                <View style={{ width: '25%', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Text>Tạm tính</Text>
                  <Text>MGG</Text>
                  <Text>Tổng tiền</Text>
                </View>
                <View style={{ width: '75%', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'red' }}>{total}đ</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput style={{ height: 25, width: 150, textAlign: 'center', borderRadius: 0, borderWidth: 1, borderColor: 'gray', marginRight: 5 }} value={coupon} onChangeText={setCoupon} />
                    <TouchableOpacity style={{ height: 25, justifyContent: 'center', backgroundColor: 'blue', paddingHorizontal: 4 }} onPress={handleApply}>
                      <Text style={{ color: 'white', alignItems: 'center' }}>Áp dụng</Text>
                    </TouchableOpacity>

                  </View>
                  <Text>
                    <Text style={{ color: 'red' }}>{newtotal}đ</Text>
                  </Text>
                </View>
              </View>
              {errMess && (<Text style={{ color: 'red' }}>{errMess}</Text>)}
            </View>
            <View style={{ paddingLeft: 16, paddingRight: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <TouchableOpacity style={{ backgroundColor: 'blue', padding: 5, borderRadius: 2, marginBottom: 10 }} onPress={handlePayment}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Trả online</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'red', padding: 5, borderRadius: 2 }} onPress={handlePayment}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Trực tiếp</Text>
              </TouchableOpacity>

            </View>
          </View>
          
          <FlatList
            data={books}
            renderItem={renderItem}
            keyExtractor={(item) => item.book_id.toString()}
          />
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}
