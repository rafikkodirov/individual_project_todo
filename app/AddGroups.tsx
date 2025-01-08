import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';

import { ColorPicker } from 'react-native-color-picker';
import { db } from './services/firebaseConfig';
import { getItems } from './services/firestore';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router'; 
import { AsyncStore } from '@/stores/global.store';
import { FSUserInfo } from '@/providers/DataProvider';
// import { getData } from '@/hooks/storageUtils';

const AddGroupScreen: React.FC = () => {
  // Состояния для формы
 const [owner, setOwner] = useState('');
  const [groupName, setGroupName] = useState('');
  // const [isPending, setIsPending] = useState(''); 
 
  const [groups, setGroups] = useState<any[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]); 
  const [nickname, setNickname] = useState(''); 
  const [color, setColor] = useState('#ffcf48'); 
    const [items, setItems] = useState<any[]>([]);
   const router = useRouter()
  //  const [userData, setUserData] = useState(null);
   useEffect(() => {
    const fetchUserData = async () => {
      try {
          AsyncStore.get<FSUserInfo>("USER_DATA").then((savedUser) => {
          // setUserData(savedUser);
          setNickname(savedUser?.nickname || ''); // Устанавливаем nickname сразу
        }) 
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);
 
  useEffect(() => {
     const fetchData = async () => {
       try {
         const fetchedGroups: any[] = await getItems('groups');
         setGroups(fetchedGroups);
         setFilteredGroups(fetchedGroups);
 
       } catch (error) {
         console.error('Ошибка загрузки данных:', error);
       }
     };
  
     fetchData();
   }, []);
  // Функция добавления задачи в Firebase
  const addGroup = async () => {
    if (!groupName ) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }

    const newGroup = {
      groupName,
      color,
      owner: nickname,
    };

    try {
      await addDoc(collection(db, 'groups'), newGroup);
      router.back()
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
         
         
        <Text style={{ marginBottom: 10 }}>Владелец: {nickname}</Text>
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
