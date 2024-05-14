import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useRoute } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import Domain from '../Components/Domain';
import axios from 'axios';

const Chapter = () => {
    const [chapters, setChapters] = useState([]);
    const [book, setBook] = useState('');
    const [selectedChapter, setSelectedChapter] = useState(1);
    const [selectedChapterContent, setSelectedChapterContent] = useState('');
    const { width } = useWindowDimensions()
    const { params } = useRoute()
    const id = params.bookId
    const handleChapterSelect = (chapterId) => {
        setSelectedChapter(chapterId);
    };

    // const handleChapterChange = (step) => {
    //     const currentChapterIndex = chapters.findIndex((chapter) => chapter.chapter_id === selectedChapter);
    //     const newChapterIndex = currentChapterIndex + step;
    //     if (newChapterIndex >= 0 && newChapterIndex < chapters.length) {
    //         setSelectedChapter(chapters[newChapterIndex].chapter_id);
    //     }
    // };
    const handleChapterChange = (step) => {
        const currentIndex = chapterOptions.findIndex(option => option.key === selectedChapter.toString());
        if (currentIndex !== -1) {
            const newIndex = currentIndex + step;
            if (newIndex >= 0 && newIndex < chapterOptions.length) {
                setSelectedChapter(parseInt(chapterOptions[newIndex].key));
            }
        }
    };


    useEffect(() => {
        const chapterContent = chapters.find((chapter) => chapter.chapter_id === selectedChapter)?.description || '';
        setSelectedChapterContent(chapterContent);
    }, [selectedChapter, chapters]);

    useEffect(() => {
        axios.get(`${Domain.domainUrl}/books/chapter/${id}`)
            .then(res => {
                setChapters(res.data.chapters);
                setBook(res.data.book_name);
                // console.log(res.data.chapters);
            })
            .catch(error => console.log(error));
    }, []);
    const chapterOptions = chapters.map(chapter => ({
        key: chapter.chapter_id.toString(),
        value: `Chương ${chapter.chapter_id}`,
    }));
    return (
        <ScrollView>
            <View className='flex flex-col justify-center items-center gap-4 mb-4 pt-8' >
                <Text className='font-bold text-3xl text-red-400 text-center'>{book}</Text>
                <View>
                    {selectedChapter && chapters && (
                        <Text className='text-base text-gray-400 text-center'>
                            Chương {selectedChapter} {selectedChapter && chapters.find((chapter) => chapter.chapter_id === selectedChapter)?.title || ''}
                        </Text>
                    )}
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                {/* <TouchableOpacity onPress={() => handleChapterChange(-1)} style={{ padding: 5 }}>
                    <Text>&lt;</Text>
                </TouchableOpacity> */}
                <SelectList
                    setSelected={(val) => setSelectedChapter(parseInt(val))}
                    data={chapterOptions}
                    defaultOption={{ key: "1", value: "Chuong 1" }}
                />
                {/* <TouchableOpacity onPress={() => handleChapterChange(1)} style={{ padding: 5 }}>
                    <Text>&gt;</Text>
                </TouchableOpacity> */}
            </View>

            {/* <Text style={{ fontSize: 16 }}>
                    {chapters.find((chapter) => chapter.chapter_id === selectedChapter)?.description || ''}
                </Text> */}
            <View style={{ flex: 1 }}>
                <RenderHtml
                    contentWidth={width}
                    source={{ html: selectedChapterContent }}

                    tagsStyles={{
                        p: {
                            lineHeight: 25,
                            fontSize: 16
                        }
                    }}
                />
            </View>

        </ScrollView>
    );
}

export default Chapter;
