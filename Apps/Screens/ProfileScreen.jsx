import { View, Text, TextInput, Image, Button } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Domain from '../Components/Domain';
import { useEffect, useState } from 'react'
import DatePicker from 'react-native-date-picker';
import { RadioButton } from 'react-native-paper';

export default function ProfileScreen() {
    const [sex, setSex] = useState()
    const [myname, setMyname] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [email, setEmail] = useState()
    const [dob, setDOB] = useState(new Date())
    const [isModified, setIsModified] = useState(false);
    const [date, setDate] = useState(new Date())
    useEffect(() => {
        getInfor()
    }, [])
    const getInfor = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${Domain.domainUrl}/users/profile`, {
                headers: {
                    'Authorization': token
                },
            });
            setSex(response.data.user.sex)
            setMyname(response.data.user.name)
            setPhone(response.data.user.phone_number)
            setAddress(response.data.user.address)
            setDOB(response.data.user.DOB)
            setEmail(response.data.user.email)
            console.log(response.data.user);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <View className=' pt-3 px-3 '>
            <Image source={{ uri: 'https://dulichhoangnguyen.com/upload/images/dai%20dien%201(1).jpg' }}
                className=" m-auto rounded-full w-24 h-24"
            />
            <View className='flex flex-col gap-2 pb-3'>
                <Text className=' text-lg'>Tên</Text>
                <View className=' bg-white'>
                    <TextInput
                        value={myname}
                        editable={false}
                        onChangeText={(e) => {
                            setMyname(e)
                            setIsModified(true)
                        }}
                    />
                </View>
                <Text className=' text-lg'>Email</Text>
                <View className=' bg-white'>
                    <TextInput
                        value={email}
                        editable={false}
                        onChangeText={(e) => {
                            setEmail(e)
                            setIsModified(true)
                        }}
                    />
                </View>
                <Text className=' text-lg'>Địa chỉ</Text>
                <View className=' bg-white'>
                    <TextInput
                        value={address}
                        editable={false}
                        onChangeText={(e) => {
                            setAddress(e)
                            setIsModified(true)
                        }}
                    />
                </View>
                <Text style={{ fontSize: 18 }}>Ngày sinh</Text>
                <View className='flex flex-row items-center bg-white'>
                    <TextInput
                        value={dob}
                        editable={false}
                        onChangeText={(e) => {
                            setDOB(e)
                            setIsModified(true)
                        }}
                    />
                </View>
                <Text className=' text-lg'>Giới tính</Text>
                <View className='flex flex-row items-center bg-white'>
                    
                    <Text>Nam</Text>
                    <RadioButton
                        value="nam"
                        disabled
                        status={sex === 'nam' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setSex('nam')
                            setIsModified(true)
                        }}
                    />
                    <Text>Nữ</Text>

                    <RadioButton
                        value="nu"
                        disabled
                        status={sex === 'nu' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setSex('nu')
                            setIsModified(true)
                        }}
                    />
                    <Text>Khác</Text>

                    <RadioButton
                        value="khac"
                        disabled
                        status={sex === 'khac' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setSex('khac')
                            setIsModified(true)
                        }}
                    />
                </View>
            </View>
            {/* <Button disabled={!isModified} title='Lưu'></Button> */}
        </View>
    )
}