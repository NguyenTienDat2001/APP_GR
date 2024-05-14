import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  return (
    <View>
    <View  className="flex flex-row items-center gap-2">
      <Image source={{uri: 'https://dulichhoangnguyen.com/upload/images/dai%20dien%201(1).jpg'}}
      className=" rounded-full w-12 h-12"
      />
      <View>
        <Text>Welcome</Text>
        <Text>Tien dat</Text>
      </View>
    </View>

    <View className='p-3 px-5 flex flex-row items-center border-[1px] border-blue-400
      mt-5 bg-white rounded-full '>
    <Ionicons name="search" size={24} color="black" />
        <TextInput placeholder='Search'/>
    </View>

    </View>
  )
}