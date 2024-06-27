import { View, Text, Image, TextInput, Button, ImageBackground, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import Domain from '../Components/Domain';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default function SignupScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('')
    const [mess, setMess] = useState('')

    const handleSignup = () => {
        // Xử lý logic đăng nhập
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
            setMess('Email không hợp lệ');
            return;
        }
        else {
            setMess('');

        }

        if (newpassword !== password) {
            setMess('Nhập lại mật khẩu không khớp');
            return;
        }
        else {
            setMess('');

        }

        const url = `${Domain.domainUrl}/register`;
        const data = {
            email: username,
            password: password
        };
        console.log('data:', data);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                // console.log(result.errorCode)
                if (result.errorCode === 0) {
                    Alert.alert('Đăng ký thành công');
                }
                if (result.errorCode === 1) {
                    Alert.alert(result.message);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleLogin = () => {

        navigation.replace('Login')
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
                <TextInput
                    className="input p-2 bg-gray-200 border border-gray-300 rounded-sm mb-2"
                    placeholder="Nhập lại mật khẩu"
                    secureTextEntry
                    onChangeText={setNewPassword}
                    value={newpassword}
                />
                <Button title="Đăng ký" onPress={handleSignup} />
                <View className='flex-row items-center justify-center mt-2'>
                    <Text>
                        Bạn đã có tài khoản?
                    </Text>
                    <TouchableOpacity onPress={handleLogin}>
                        <Text className='text-blue-500 underline'>Đăng nhập ngay</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {mess && (<Text className='' style={{ color: 'red' }}>{mess}</Text>)}
                </View>

            </View>
        </ImageBackground >
    )
}