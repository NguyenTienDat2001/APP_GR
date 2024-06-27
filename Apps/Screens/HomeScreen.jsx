import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ItemList from '../Components/ItemList'
import Domain from '../Components/Domain'
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import axios from 'axios'
export default function HomeScreen() {
  const [textkey, setText] = useState('')
  const [books, setBooks] = useState([])
  const [allbooks, setAllbooks] = useState([])
  const [bestbooks, setBestbooks] = useState([])
  const navigation = useNavigation()
  const [user, setUser] = useState()
  // useEffect(() => {
  //   getUser()
  // }, [])
  useFocusEffect(
    React.useCallback(() => {
      getUser()
      getAllBooks()
      getBestBooks()
    }, [])
  );
  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${Domain.domainUrl}/users/profile`, {
        headers: {
          'Authorization': token
        },
      })
      console.log(response.data);
      setUser(response.data.user)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // useEffect(() => {
  //   getAllBooks()
  //   getBestBooks()
  // }, [])
  useEffect(() => {
    if (textkey) {
      getBooks()
    }
  }, [textkey])

  const getAllBooks = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${Domain.domainUrl}/books/new`, {
        headers: {
          'Authorization': token
        },
      });
      setAllbooks(response.data.books)
      console.log(response.data.books);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const getBestBooks = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${Domain.domainUrl}/books/bestseller`, {
        headers: {
          'Authorization': token
        },
      });
      setBestbooks(response.data.books)
      // console.log(response.data.books);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getBooks = async () => {
    try {
      const response = await axios.post(`${Domain.domainUrl}/books/search`, {
        book_name: textkey,
      });
      setBooks(response.data.books)
      // console.log(response.data.books);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const renderItem = ({ item }) => (
    <View className=' px-1 bg-white mb-2 p-2'>
      <TouchableOpacity onPress={() => navigation.navigate('Detail', { bookId: item.id })}>
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
    <View className="px-5 py-10 bg-white flex-1">
      <View>
        {user && <View className="flex flex-row items-center gap-2">
          <Image source={{ uri: user.avatar }}
            className=" rounded-full w-12 h-12"
          />
          <View>
            <Text>Welcome</Text>
            <Text>{user.name ? user.name : user.email}</Text>
          </View>
        </View>
        }


        <View className='p-3 px-5 flex flex-row items-center border-[1px] border-blue-400
      mt-5 bg-white rounded-full '>
          <Ionicons name="search" size={24} color="black" />
          <TextInput
            placeholder='Search'
            value={textkey}
            onChangeText={(e) => setText(e)}
          />
        </View>

      </View>
      {textkey ?
        <View>
          <FlatList
            data={books}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            initialNumToRender={5}
          />
        </View>
        :
        <ScrollView>
          <View className=' mb-5'>
            <Text className='font-bold text-xl pt-3 text-red-400'>Sách mới</Text>
            <ItemList books={allbooks} getBooks={getAllBooks} />
            <Text className='font-bold text-xl text-blue-400'>Sách bán chạy</Text>
            <ItemList books={bestbooks} getBooks={getBestBooks} />
          </View>
        </ScrollView>
      }

    </View>
  )
}