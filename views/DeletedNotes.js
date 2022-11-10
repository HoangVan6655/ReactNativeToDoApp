import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import * as Style from '../assets/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeletedNotes = ({ ...props }) => {
    function emptyBin() {
        Alert.alert(
            'Xoá tất cả Note',
            'Bạn có muốn xoá tất cả Note không ?',
            [
                {
                    text: 'Không',
                    onPress: () => console.log('No pressed'),
                    style: 'cancel'
                },
                {
                    text: "Có",
                    onPress: () => {
                        let emptyArray = [...props.moveToBin];
                        emptyArray = [];
                        props.setMoveToBin(emptyArray);

                        AsyncStorage.setItem('deletedNotes', JSON.stringify(emptyArray)).then(() => {
                            props.setMoveToBin(emptyArray)
                        }).catch(error => console.log(error))
                    }
                }
            ]
        )
        console.log('Bạn có chắc muốn xoá tat ca Note này không ?');
        
    }

    function undoAllNotes() {
        let deletedNotes = [...props.moveToBin];
        let notes = [...props.notes];
        deletedNotes.forEach((item, index) => {
            notes.push(item)
        })
        props.setMoveToBin([]);
        props.setNotes(deletedNotes);

        AsyncStorage.setItem('storedNotes', JSON.stringify(notes)).then(() => {
            props.setNotes(notes)
        }).catch(error => console.log(error))

        AsyncStorage.setItem('deletedNotes', JSON.stringify([])).then(() => {
            props.setMoveToBin([])
        }).catch(error => console.log(error))
    }

    function undoNote(index) {
        let getBack = props.moveToBin[index];
        let array = [getBack, ...props.notes];
        props.setNotes(array);

        let newArray = [...props.moveToBin];
        newArray.splice(index, 1);
        props.setMoveToBin(newArray);

        AsyncStorage.setItem('storedNotes', JSON.stringify(array)).then(() => {
            props.setNotes(array)
        }).catch(error => console.log(error))

        AsyncStorage.setItem('deletedNotes', () => {
            return;
        })
    }

    function permanentlyDelete(index) {
        Alert.alert(
            'Xoá Note này',
            'Bạn có chắc muốn xoá Note này không ?',
            [
                {
                    text: 'Không',
                    onPress: () => console.log('No pressed'),
                    style: 'cancel',
                }, {
                    text: 'Có',
                    onPress: () => {
                        let newArray = [...props.moveToBin];
                        newArray.splice(index, 1);
                        props.setMoveToBin(newArray);

                        AsyncStorage.setItem('deletedNotes', JSON.stringify(newArray)).then(() => {
                            props.setMoveToBin(newArray)
                        }).catch(error => console.log(error))
                    }
                }
            ]

        )
        console.log('Bạn có chắc muốn xoá Note này không ?');
    }

    return (
        <ImageBackground 
            source={{ uri: 'https://st.quantrimang.com/photos/image/2021/03/10/Hinh-nen-dep-cute-6.jpg' }}
            resizeMode='cover'
            style={styles.bgContainer}>
            <ScrollView>
                <View style={styles.notesContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.emptyButton} onPress={() => undoAllNotes()}>
                            <Text style={styles.emptyButtonText}>Undo All</Text>
                        </TouchableOpacity>

                        <Text style={{ fontWeight: '700', fontSize: 18, color: Style.color }}>
                            Tổng: {props.moveToBin.length}
                        </Text>

                        <TouchableOpacity style={styles.emptyButton} onPress={() => emptyBin()}>
                            <Text style={styles.emptyButtonText}>Empty</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider}></View>

                    {props.moveToBin.length === 0
                        ?

                        <View style={styles.emptyNoteContainer}>
                            <Text style={styles.emptyNoteText}>Thùng rác hiện chưa có Note nào đã xoá...!</Text>
                        </View>
                        :

                        props.moveToBin.map((item, index) =>
                            <View style={styles.item}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={styles.note}>
                                        <Text style={styles.index}>{index + 1}. </Text>
                                        <Text style={styles.text}>{item}</Text>
                                    </View>

                                    <TouchableOpacity onPress={() => undoNote(index)}>
                                        <Text style={styles.delete}>Hoãn tác</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.dateContainer} >
                                    <Text>{props.date} </Text>

                                    <TouchableOpacity onPress={() => permanentlyDelete(index)}>
                                        <Text style={styles.delete}>Xoá</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default DeletedNotes;

const styles = StyleSheet.create({
    dateContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    delete: {
        color: Style.color,
        fontWeight: '700',
        fontSize: 15
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
    emptyNoteText: {
        color: Style.color,
        fontWeight: '600',
        fontSize: 15
    },
    emptyNoteContainer: {
        alignItems: 'center',
        marginTop: 240
    },
    notesContainer: {
        paddingTop: 10,
        paddingHorizontal: 20,
        marginBottom: 70,
        opacity: 0.9
    },
    divider: {
        width: '100%',
        height: 2,
        backgroundColor: Style.color,
        marginTop: 5,
        marginBottom: 5
    },
    emptyButton: {
        backgroundColor: Style.color,
        width: '25%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        marginBottom: 5
    },
    emptyButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700'
    },
    bgContainer: {
        flex: 1,
        alignItems: 'center'
    },
})