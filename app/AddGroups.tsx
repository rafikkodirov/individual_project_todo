import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';

import { ColorPicker } from 'react-native-color-picker';
import { db } from './services/firebaseConfig';
import { getItems } from './services/firestore';
const AddGroupScreen: React.FC = () => {
  // Состояния для формы

  const [sliderValue, setSliderValue] = useState(50);
  const [color, setColor] = useState('#ffcf48');
  const [groupName, setGroupName] = useState('');  
    const [items, setItems] = useState<any[]>([]);
  
  const [owner, setOwner] = useState('');
 
  // Функция добавления задачи в Firebase
  const addGroup = async () => {
    if (!groupName || !owner ) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }

    const newGroup = {
      groupName,
      color,
      owner,
    };

    try {
      await addDoc(collection(db, 'groups'), newGroup);
      alert('Группа успешно добавлена!');
      setGroupName('');
      setOwner('');
      setColor('#ffcf48')
    } catch (error) {
      console.error('Ошибка при добавлении группы:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Поле для Title */}
        <Text style={styles.header}>Название группы:</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите название группу"
          value={groupName}
          onChangeText={setGroupName}
        />
         <Text style={styles.header}>Имя Владельца:</Text>
         <TextInput
          style={styles.input}
          placeholder="Введите имя владельца"
          value={owner}
          onChangeText={setOwner}
        />
        <Text style={{ marginBottom: 10 }}>Выбранный цвет: {color}</Text>
       
  
        {/* Кнопка для отправки */}
        <Button title="Добавить группу" onPress={addGroup} color="#007bff" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
});

export default AddGroupScreen;
