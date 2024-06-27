import { View, Text, TextInput, Image, Button } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Domain from '../Components/Domain';
import { useEffect, useState } from 'react'
import DatePicker from 'react-native-date-picker';
import { RadioButton } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function AddOrderScreen() {
    const [myname, setMyname] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const { params } = useRoute()
    const navigation = useNavigation()

  const order_id = params.order_id;
  const newtotal = params.newtotal;
  const code = params.code;
//   console.log(order_id);
//   console.log(newtotal);
  console.log(code);

    // useEffect(() => {
        
    // }, [])
    const addOrder = () => {
        
        const data = {
            order_id: order_id,
            account: newtotal,
            address: address,
            receiver: myname,
            phone_number: phone,
            code: code,
        };
        axios.post(`${Domain.domainUrl}/orders`, data)
            .then(result => {
                console.log(result);
                // setIsModalOpen(false);
                // getCart();
               navigation.navigate('CartStack')

            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <View className=' pt-3 px-3 '>
            <Text className=' text-xl'>Nhập thông tin nhận hàng</Text>
            <View className='flex flex-col gap-2 pb-3'>
                <Text className=' text-lg'>Địa chỉ</Text>
                <View className=' bg-white'>
                    <TextInput
                        value={address}
                        onChangeText={(e) => {
                            setAddress(e)
                            
                        }}
                    />
                </View>
                <Text className=' text-lg'>Người nhận</Text>
                <View className=' bg-white'>
                    <TextInput
                        value={myname}
                        
                        onChangeText={(e) => {
                            setMyname(e)
                            
                        }}
                    />
                </View>
                <Text className=' text-lg'>Số điện thoại</Text>
                <View className=' bg-white'>
                    <TextInput
                        value={phone}
                        onChangeText={(e) => {
                            setPhone(e)
                            
                        }}
                    />
                </View>
            </View>
            <Button onPress={addOrder} title='Tạo đơn'></Button>
        </View>
    )
}