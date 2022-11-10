import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView, Alert, Keyboard, ImageBackground } from "react-native";
import * as Style from '../assets/styles';
import * as eva from '@eva-design/eva';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Foundation, Feather, EvilIcons } from '@expo/vector-icons';

const Notes = ({ navigation, ...props }) => {
    const [searchNote, setSearchNote] = useState();

    function deleteNote(index) {
        let newArray = [...props.notes];
        let movedNote = newArray.splice(index, 1);
        props.setNotes(newArray);
        props.setMoveToBin(movedNote);

        let bin = [movedNote, ...props.moveToBin];
        props.setMoveToBin(bin);

        AsyncStorage.setItem('storedNotes', JSON.stringify(newArray)).then(() => {
            props.setNotes(newArray)
        }).catch(error => console.log(error))

        AsyncStorage.setItem('deletedNotes', JSON.stringify(bin)).then(() => {
            props.setMoveToBin(bin)
        }).catch(error => console.log(error))
    }

    function search() {
        if (searchNote === '') {
            Alert.alert('Type something in search box');
        } else if (search !== '') {
            props.notes.forEach((item, index) => {
                if (item.includes(searchNote)) {
                    let searchItem = [...props.notes];
                    let firstElOfArray = searchItem[0];
                    let index = [...props.notes].indexOf(item);
                    searchItem[0] = item;
                    searchItem[index] = firstElOfArray;
                    props.setNotes(searchItem);
                }
            })
        }
        setSearchNote('');
        Keyboard.dismiss();
    }

    function clearAllNotes() {
        let emptyArray = [...props.notes];
        let deletedCompArray = [...props.moveToBin];
        emptyArray.forEach((item, index) => {
            deletedCompArray.push(item);
        })
        emptyArray = [];
        props.setNotes(emptyArray);
        props.setMoveToBin(deletedCompArray);

        AsyncStorage.setItem('storedNotes', JSON.stringify(emptyArray)).then(() => {
            props.setNotes(emptyArray)
        }).catch(error => console.log(error))

        AsyncStorage.setItem('deletedNotes', JSON.stringify(deletedCompArray)).then(() => {
            props.setMoveToBin(deletedCompArray)
        }).catch(error => console.log(error))
    }

    return (
        <ImageBackground
            source={{ uri: 'https://st.quantrimang.com/photos/image/2021/03/10/Hinh-nen-dep-cute-17.jpg' }}
            resizeMode='cover'
            style={styles.bgContainer}
        >
            <View style={[styles.notesContainer]}>
                <View style={[styles.headingContainer]}>
                    <Text style={[styles.heading]}>NVK Note </Text>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.button, { marginLeft: 40 }]} onPress={() => navigation.navigate('DeletedNotes')}>
                            <Foundation name="trash" size={25} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('AddNote')}>
                            <Feather name="plus-circle" size={25} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: '700', fontSize: 18, color: Style.color }}>
                        Tổng Note: {props.notes.length}
                    </Text>
                </View>

                <View style={styles.divider}>

                </View>

                <View style={styles.searchContainer}>
                    <TextInput placeholder='Tìm Kiếm...' placeholderTextColor={Style.color} style={[styles.input, { borderWidth: 3 }]}
                        value={searchNote} onChangeText={(text) => setSearchNote(text)} />

                    <TouchableOpacity style={[styles.searchButton, { width: 50 }]} onPress={() => search()}>
                        <EvilIcons name="search" size={25} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.searchButton} onPress={() => clearAllNotes()}>
                        <Text style={styles.searchButtonText}>Clear</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {props.notes.length === 0
                        ?

                        <View style={styles.emptyNoteContainer}>
                            <Text style={styles.emptyNoteText}>Chưa có Note nào! Nhấn + để thêm note mới...</Text>
                        </View>
                        :
                        props.notes.map((item, index) =>
                            <View style={styles.item} key={index}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={styles.note}>
                                        <Text style={styles.index}>{index + 1}. </Text>
                                        <Text style={styles.text}>{item}</Text>
                                    </View>

                                    <TouchableOpacity onPress={() => deleteNote(index)}>
                                        <Text style={styles.delete}>Xoá Note</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.dateContainer}>
                                    <Text>{props.date}</Text>

                                    <TouchableOpacity onPress={() => navigation.navigate('EditNote', {
                                        i: index,
                                        n: item
                                    })}>
                                        <Text style={styles.delete}>Chỉnh Sửa Note</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                </ScrollView>
            </View>
        </ImageBackground>

    )
}

export default Notes;

const styles = StyleSheet.create({
    notesContainer: {
        paddingTop: 10,
        paddingHorizontal: 20,
        marginBottom: 70,
        opacity: 0.9,
    },
    heading: {
        fontSize: 30,
        fontWeight: '700',
        color: Style.color,
    },
    divider: {
        width: '100%',
        height: 2,
        backgroundColor: Style.color,
        marginTop: 5,
        marginBottom: 5
    },
    item: {
        marginBottom: 20,
        padding: 15,
        color: 'black',
        opacity: 0.8,
        marginTop: 10,
        shadowColor: Style.color,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderColor: Style.color,
        borderWidth: 2,
        borderRadius: 5,
        borderLeftWidth: 15
    },
    index: {
        fontSize: 20,
        fontWeight: '800'
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        backgroundColor: Style.color,
        width: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        height: 50
    },
    buttonText: {
        color: 'white',
        fontSize: 32,
        fontWeight: '800'
    },
    scrollView: {
        marginBotom: 70
    },
    note: {
        flexDirection: 'row',
        width: '75%'
    },
    text: {
        fontWeight: '700',
        fontSize: 17,
        alignSelf: 'center'
    },
    delete: {
        color: Style.color,
        fontWeight: '700',
        fontSize: 15
    },
    input: {
        height: 40,
        paddingHorizontal: 20,
        width: '65%',
        fontSize: 19,
        color: 'black',
        fontWeight: '600',
        opacity: 0.8,
        shadowColor: Style.color,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderColor: Style.color,
        borderWidth: 2,
        borderRadius: 5,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8
    },
    searchButton: {
        backgroundColor: Style.color,
        alignItems: "center",
        justifyContent: 'center',
        width: 60,
        borderRadius: 5,
        height: 40
    },
    searchButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 12
    },
    emptyNoteContainer: {
        alignItems: 'center',
        marginTop: 240
    },
    emptyNoteText: {
        color: Style.color,
        fontWeight: '600',
        fontSize: 15
    },
    dateContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    bgContainer: {
        flex: 1,
        alignItems: 'center'
    },
})