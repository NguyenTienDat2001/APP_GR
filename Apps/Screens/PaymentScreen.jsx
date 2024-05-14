import { View, Text, Image, TextInput, Button, ImageBackground, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Domain from '../Components/Domain';
import axios from 'axios';
export default function PaymentScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const handleLogin = async () => {
    //     try {
    //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //         if (!emailRegex.test(username)) {
    //             // setMess('Email invalid');
    //             return;
    //         }
    //         console.log('okkkk');
    //         // const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    //         const response = await axios.post(`${Domain.domainUrl}/login`, {
    //             email: username,
    //             password: password,
    //         });
    //         console.log('book is', response.data.data);
    //         await AsyncStorage.setItem('userId', response.data.data.id.toString());
    //         const userId = await AsyncStorage.getItem('userId');
    //         console.log('id is ', userId);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };
    const handleLogin = async () => {
        try {
            console.log('okkkk');
            // const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            const response = await axios.post(`${Domain.domainUrl}/payment`, {
                order_id: 13211444111112,
                total_price: 100000,
            });
            console.log(response);
            Linking.openURL(response.data);

            console.log('ok');
            setTimeout(() => {
                navigation.navigate('PaymentScreen');
            }, 5000);
            // await AsyncStorage.setItem('userId', response.data.data.id.toString());
            // const userId = await AsyncStorage.getItem('userId');
            // console.log('id is ', userId);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleSignUp = () => {
        // Điều hướng tới màn hình đăng ký tài khoản tại đây
        console.log('Navigate to Sign Up screen');
    };
    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/1200x/b8/06/49/b8064988adfbb553098e30f7acff5cbf.jpg' }}
            className="flex-1 justify-center items-center w-full h-full object-cover"
        >
            <View >
                {/* <Text>LoginScreen</Text> */}
                <View className="flex justify-center items-center">
                    <Text className="text-red-400 text-3xl font-bold mb-8 w-60 text-center">Welcome to my bookstore</Text>
                </View>

                <TextInput
                    className="input p-2 bg-gray-200 border border-gray-300 rounded-sm mb-2"
                    placeholder="Email"
                    onChangeText={setUsername}
                    value={username}
                />
                <TextInput
                    className="input p-2 bg-gray-200 border border-gray-300 rounded-sm mb-2"
                    placeholder="Mật khẩu"
                    secureTextEntry
                    onChangeText={setPassword}
                    value={password}
                />
                <Button title="Đăng nhập" onPress={() => navigation.replace('PaymentScreen')} />
                <View className='flex-row items-center justify-center mt-2'>
                    <Text>
                        Bạn chưa có tài khoản?
                    </Text>
                    <TouchableOpacity onPress={handleSignUp}>
                        <Text className='text-blue-500 underline'>Tạo tài khoản mới</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground >
    )
}