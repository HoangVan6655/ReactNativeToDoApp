import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notes from './views/Notes';
import AddNote from './views/AddNote';
import DeletedNotes from './views/DeletedNotes';
import React, { useState, useEffect } from 'react';
import EditNote from './views/EditNote';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {

  const [note, setNote] = useState();
  const [notes, setNotes] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleString());
  const [moveToBin, setMoveToBin] = useState([]);

  function handleNote() {
    let newNote = note;
    let newNotes = [newNote, ...notes];
    setNotes(newNotes);
    setNote('');

    AsyncStorage.setItem('storedNotes', JSON.stringify(newNotes)).then(() => {
      setNotes(newNotes)
    }).catch(error => console.log(error))

    AsyncStorage.setItem('date', JSON.stringify(date)).then(() => {
      setDate(date);
    })
  }

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    AsyncStorage.getItem('storedNotes').then(data => {
      if (data !== null) {
        setNotes(JSON.parse(data));
      }
    }).catch(error => console.log(error))

    AsyncStorage.getItem('deletedNotes').then(data => {
      if (data !== null) {
        setMoveToBin(JSON.parse(data));
      }
    }).catch(error => console.log(error))

    AsyncStorage.getItem('date');
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Notes' options={{ title: 'Note' }}>
          {props => <Notes {...props} notes={notes} setNotes={setNotes} moveToBin={moveToBin} setMoveToBin={setMoveToBin} note={note} setNote={setNote} date={date} setDate={setDate} />}
        </Stack.Screen>

        <Stack.Screen name='AddNote' options={{ title: 'Thêm mới Note' }}>
          {props => <AddNote {...props} note={note} setNote={setNote} handleNote={handleNote} />}
        </Stack.Screen>

        <Stack.Screen name='DeletedNotes' options={{ title: 'Thùng rác Note' }}>
          {props => <DeletedNotes {...props} moveToBin={moveToBin} setMoveToBin={setMoveToBin} notes={notes} setNotes={setNotes} date={date} />}
        </Stack.Screen>

        <Stack.Screen name='EditNote' options={{ title: 'Chỉnh sửa Note' }}>
          {props => <EditNote {...props} notes={notes} setNotes={setNotes}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
