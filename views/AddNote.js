import React from 'react';
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import * as Style from '../assets/styles';

const AddNote = ({ navigation, ...props }) => {
    return (
        <ImageBackground
            source={{ uri: 'https://st.quantrimang.com/photos/image/2021/03/10/Hinh-nen-dep-cute-19.jpg' }}
            resizeMode='cover'
            style={styles.bgContainer}>
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <View style={{ padding: 20, justifyContent: 'space-around' }}>
                        <TextInput style={[styles.input]} placeholder='Type Here...'
                            multiline={true}
                            defaultValue={props.note} onChangeText={(text) => props.setNote(text)}
                        />

                        <TouchableOpacity style={styles.button} onPress={() => {
                            if (props.note === '') {
                                Alert.alert('Please Type Something');
                            } else {
                                props.handleNote();
                                navigation.navigate('Notes')
                            }
                        }}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default AddNote;

const styles = StyleSheet.create({
    addNoteContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
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
        height: 300,

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