import React, { useEffect, useState } from 'react';
import { Text, TextInput, Button, SafeAreaView, ScrollView, Platform } from 'react-native';
import { getItems } from './services/firestore';
import { useRouter } from 'expo-router';
import { AsyncStore } from '@/stores/global.store';
import { FSUserInfo, useDataContext } from '@/providers/DataProvider';
const styles = Platform.OS === 'android'
  ? require('../styles/styles.android').default
  : require('../styles/styles.android').default;

  interface AddGroupScreenProps {
    closeModal: () => void;
  } 

const AddGroupScreen: React.FC<AddGroupScreenProps> = ({closeModal}) => {
  // Состояния для формы
  const [owner, setOwner] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState<any[]>([]); 
  const [nickname, setNickname] = useState('');
  const [color, setColor] = useState('#ffcf48'); 
  const router = useRouter()

  const { addGroups, userData } = useDataContext();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        AsyncStore.get<FSUserInfo>("USER_DATA").then((savedUser) => {
          setNickname(savedUser?.nickname || '');
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

      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    fetchData();
  }, []);
  const addGroup = async () => {
    if (!groupName) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }

    const newGroup = {
      groupName,
      color,
      owner: nickname,
    };

    try {
      await addGroups(newGroup);
      closeModal()
      // router.back() 
      // setGroupName('');
      // setOwner('');
      // setColor('#ffcf48')
    } catch (error) {
      console.error('Ошибка при добавлении группы:', error);
    }
  };
  return (
    <SafeAreaView style={styles.containerAddGroup}>
      <ScrollView contentContainerStyle={{ padding: 16}}>
        <Text style={styles.header}>Название группы:</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите название группу"
          value={groupName}
          onChangeText={setGroupName}
        />  
        <Button title="Добавить группу" onPress={addGroup} color="#007bff" />
      </ScrollView>
    </SafeAreaView>
  );
};
export default AddGroupScreen;