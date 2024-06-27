import { View, Text, FlatList, Image, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Domain from '../Components/Domain';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import axios from 'axios';
export default function GiftScreen() {
  const navigation = useNavigation()
  const [gifts, setGifts] = useState([]);
  const [point, setPoint] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      getGifts();
      getInfor()
    }, [])
  );
  const getInfor = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${Domain.domainUrl}/users/profile`, {
        headers: {
          'Authorization': token
        },
      });
      setPoint(response.data.user.point)

    } catch (error) {
      console.error('Error:', error);
    }
  };
  const getGifts = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${Domain.domainUrl}/coupons/gift`, {
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
      <View className='flex flex-row justify-around items-center gap-3 px-1'>
        <View>
          <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bRzciTEx-kD8yfyjNL4M2BNdiih8gISAIw&usqp=CAU' }} style={{ height: 100, width: 70, backgroundColor: 'rgba(217, 217, 217, 0.23)' }} />
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{item.des}</Text>
          <Text>{item.point}điểm</Text>
          {item.condition && <Text>{item.condition}đ</Text>}
        </View>
        {/* <View>
                <Text>{moment(item.start_date).format('DD-MM-YYYY')}</Text>
                <Text>{moment(item.end_date).format('DD-MM-YYYY')}</Text>
            </View> */}
        <View>
          <Button onPress={() => handleExchange(item.id)} disabled={point < item.point} title='Đổi' />
        </View>
      </View>

    </View>
  );
  const handleExchange = async (id) => {
    const data = {
      coupon_id: id,
    };
    const token = await AsyncStorage.getItem('token');
    axios.post(`${Domain.domainUrl}/coupons/exchange`, data, {
      headers: {
        'Authorization': token
      },
    })
      .then(result => {
        getGifts()
        getInfor()
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      })
  }
  return (
    <View className='pt-2 px-3'>
      <View className='pb-2'><Text className='text-lg font-bold'>Bạn có {point} điểm</Text></View>
      <FlatList
        data={gifts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}