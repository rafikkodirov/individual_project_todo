import React, { useEffect, useState } from 'react';
import { Text, Button, SafeAreaView, ScrollView, Platform } from 'react-native';
import { getItems } from './services/firestore';

const styles = Platform.OS === 'android'
  ? require('../styles/styles.android').default
  : require('../styles/styles.android').default;

  const [tasks, setTasks] = useState<any>([]);
  interface AddGroupScreenProps {
    closeModal: () => void; 
  }
useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTask: any[] = await getItems('tasks'); 
        setTasks(fetchedTask)
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    fetchData();
  }, []);
const TaskDesc: React.FC<AddGroupScreenProps> = ({ closeModal }) => { 
 
  return (
    <SafeAreaView style={styles.containerAddGroup}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.header}> s</Text>
        <Text>{tasks?.description}</Text>
         <Button title="Закрыть"  color="#007bff" />
      </ScrollView>
    </SafeAreaView>
  );
};
export default TaskDesc;