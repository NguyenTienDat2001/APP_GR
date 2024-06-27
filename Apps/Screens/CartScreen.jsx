import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Button, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Modal, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Domain from '../Components/Domain';
import { SelectList } from 'react-native-dropdown-select-list';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function CartScreen() {
  const [selected, setSelected] = useState("");
  const [books, setBooks] = useState([]);
  const [totalitem, setTotalitem] = useState(0)
  const [total, setTotal] = useState(0)
  const [newtotal, setNewtotal] = useState(total)
  const [coupon, setCoupon] = useState()
  const [appcoupon, setAppCoupon] = useState()
  const [errMess, setErrMess] = useState()
  const [successMess, setSuccessMess] = useState()
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState(false);
  const [order_id, setOrderid] = useState()
  const navigation = useNavigation()
  useFocusEffect(
    React.useCallback(() => {
      setTotal(0)
      setTotalitem(0)
      setNewtotal(0)
      getBooks();
    }, [])
  );

  useEffect(() => {
    setNewtotal(total)
    setErrMess()
    setSuccessMess()
}, [coupon]);

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
      if (response.data.data) {
        let x = response.data.data.reduce((acc, book) => acc + (book.price * book.quantity), 0)
        let y = response.data.data.reduce((acc, book) => acc + (book.quantity), 0)
        console.log(x);
        console.log(y);
        setTotal(x)
        setNewtotal(x)
        setTotalitem(y)
        setOrderid(response.data.order_id)
        console.log(response.data.order_id)
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateCart = async (book_id, scope) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(`${Domain.domainUrl}/cart/update`,
        {
          book_id: book_id,
          scope: scope
        },
        {
          headers: {
            'Authorization': token
          },
        });
      getBooks()
    } catch (error) {
      console.error('Error:', error);
    }

  }
  const handleIncrement = (book_id) => {
    setBooks(books => books.map((book) =>
      book_id === book.book_id ? { ...book, quantity: book.quantity + 1 } : book
    ))
    updateCart(book_id, 'inc')
  }

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      setBooks(books => books.map((book) =>
        item.book_id === book.book_id ? { ...book, quantity: book.quantity - 1 } : book
      ))
      updateCart(item.book_id, 'des')
    }
  }

  const deleteCart = async (book_id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.delete(`${Domain.domainUrl}/cart/${book_id}`, {
        headers: {
          'Authorization': token
        },
      });
      getBooks()
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleApply = async () => {

    const token = await AsyncStorage.getItem('token');
    axios.post(`${Domain.domainUrl}/coupons/apply`, {
      code: coupon,
      price: total,
    })
      .then(result => {
        if (result.status === 200) {
          console.log(result);
          setNewtotal(result.data.price)
          setAppCoupon(coupon)

          setErrMess('');
          setSuccessMess('Áp dụng mã thành công')
        }
        if (result.status === 201) {
          setErrMess('Mã không hợp lệ');
          setSuccessMess('')
        }
        if (result.status === 202) {
          setErrMess('Không đủ điều kiện');
          setSuccessMess('')
        }
        if (result.status === 203) {
          setErrMess('Đã được sử dụng');
          setSuccessMess('')
        }
      })
      .catch(error => {
        console.error(error);

      })
  };

  const renderItem = ({ item }) => (
    <View className=' pl-1 bg-white mb-3 rounded-md'>
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
          </View>
        </View>
        <View className='flex gap-1 items-center'>
          <Text className=' text-red-500'>{item.price}đ</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
            <TouchableOpacity
              style={{ height: 30, width: 25, borderRadius: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}
              onPress={() => handleDecrement(item)}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={{ borderWidth: 1, borderColor: 'gray', width: 25, height: 30, padding: 5, textAlign: 'center' }}
              onChangeText={(text) => handleQuantityChange(item, text)}
              value={item.quantity.toString()}
              editable={false}
            />
            <TouchableOpacity
              style={{ height: 30, width: 25, borderRadius: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}
              onPress={() => handleIncrement(item.book_id)}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)', // Làm mờ nền khi mở modal
    },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    textInput: {
      height: 40,
      width: 100,
      backgroundColor: '#f0f0f0',
      borderWidth: 1,
      borderColor: 'black',
      textAlign: 'center',
      marginBottom: 20,
    },
  });

  return (
    <KeyboardAvoidingView behavior='padding'
      style={{ flex: 1 }}>
      <View className='mb-10' style={{ flex: 1 }}>
        <View className='px-5 pt-3 pb-20 mb-8'>
          {/* <Text className=' font-bold text-xl pb-2'>Giỏ hàng của bạn</Text> */}
          <View className='mb-3 pt-2' style={{ width: '100%', backgroundColor: 'white', marginTop: 2, borderRadius: 10, flexDirection: 'column', justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, gap: 4 }}>
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
                    <TouchableOpacity style={{ height: 25, justifyContent: 'center', backgroundColor: 'green', paddingHorizontal: 4 }} onPress={handleApply}>
                      <Text style={{ color: 'white', alignItems: 'center' }}>Áp dụng</Text>
                    </TouchableOpacity>

                  </View>
                  <Text>
                    <Text style={{ color: 'red' }}>{newtotal}đ</Text>
                  </Text>
                </View>
              </View>
              {errMess && (<Text className='pl-4' style={{ color: 'red' }}>{errMess}</Text>)}
              {successMess && (<Text className='pl-4' style={{ color: 'green' }}>{successMess}</Text>)}
            </View>
            <View className='items-center m-auto' style={{ paddingLeft: 16, paddingRight: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <TouchableOpacity style={{ backgroundColor: 'blue', padding: 5, borderRadius: 2, marginBottom: 10 }} onPress={() => navigation.navigate('AddOrderScreen', { code: coupon, newtotal: newtotal, order_id: order_id })}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Tạo đơn</Text>
              </TouchableOpacity>


            </View>
          </View>
          {books ? (<View>
            <FlatList
              data={books}
              renderItem={renderItem}
              keyExtractor={(item) => item.book_id.toString()}
            />

          </View>) : (<View><Text className=' text-center text-xl'>Bạn chưa có sản phẩm nào</Text></View>)
          }
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}
