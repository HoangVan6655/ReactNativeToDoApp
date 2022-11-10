import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import * as Style from '../assets/styles';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditNote = ({ route, navigation, ...props }) => {
    const { i, n } = route.params;
    const [newEdit, setNewEdit] = useState(n)

    function editNote() {
        let edited = [...props.notes];
        edited[i] = newEdit;
        props.setNotes(edited);

        navigation.navigate('Notes');

        AsyncStorage.setItem('storedNotes', JSON.stringify(edited)).then(() => {
            props.setNotes(edited)
        }).catch(error => console.log(error))
    }

    return (
        <ImageBackground
            source={{ uri: 'https://st.quantrimang.com/photos/image/2021/03/10/Hinh-nen-dep-cute-2.jpg' }}
            resizeMode='cover'
            style={styles.bgContainer}>
            <ScrollView>
                <View style={{ padding: 20, justifyContent: 'space-around' }}>
                    <TextInput style={[styles.input]} placeholder='Type Here...'
                        multiline={true}
                        defaultValue={newEdit.toString()} onChangeText={(text) => setNewEdit(text)}
                    />

                    <TouchableOpacity style={styles.button} onPress={() => editNote()}>
                        <Text style={styles.buttonText}>Cập Nhật</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default EditNote;

const styles = StyleSheet.create({
    addNoteContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        padding: 20,
        paddingTop: 20,
        width: '100%',
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
        height: 300
    },
    button: {
        backgroundColor: Style.color,
        width: '40%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        alignSelf: 'flex-end',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700'
    },
    bgContainer: {
        flex: 1,
    },
})