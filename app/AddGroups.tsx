import React, { useEffect, useState } from 'react';
import { Text, TextInput, Button, SafeAreaView, ScrollView, Platform } from 'react-native';
import { getItems } from './services/firestore';
import { useRouter } from 'expo-router';
import { AsyncStore } from '@/stores/global.store';
import { FSUserInfo, useDataContext } from '@/providers/DataProvider';
import { useLoading } from '@/providers/LoadingProvider';
import { debounce } from 'lodash';

const styles = Platform.OS === 'android'
  ? require('../styles/styles.android').default
  : require('../styles/styles.android').default;

interface AddGroupScreenProps {
  closeModal: () => void;
}

const AddGroupScreen: React.FC<AddGroupScreenProps> = ({ closeModal }) => { 
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState<any[]>([]);
  const [nickname, setNickname] = useState('');
  const [color, setColor] = useState('#ffcf48'); 
  const { isLoading, setLoading } = useLoading()

  const { addGroups, userData } = useDataContext();
 

  
  const addGroup = debounce(async () => {
    if (!groupName) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }
    const newGroup = {
      groupName,
      color,
      owner: userData.nickname,
    };

    try {
      if (isLoading) return;
      setLoading(true);
      await addGroups(newGroup);      
      closeModal() 
    } catch (error) {
      setLoading(false);
      console.error('Ошибка при добавлении группы:', error);
    }
  }, 500);
  return (
    <SafeAreaView style={styles.containerAddGroup}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
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