import { View, Text, FlatList, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import TaskCard from '@/components/TaskCard';

import Dialog from '@/components/DialogComponent ';
import { useDataContext } from '@/providers/DataProvider';
import { useLoading } from '@/providers/LoadingProvider';
import { updateElementToTheFirebase } from '../services/firestore';
import dayjs from 'dayjs';
const styles = Platform.OS === 'android'
  ? require('../../styles/styles.android').default
  : require('../../styles/styles.android').default;
const ActiveTask: React.FC = () => {
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] = useState<boolean>(false);

  const { cachedTasks } = useDataContext();
  const { isLoading } = useLoading()

  const EmptyList = () => {
    if (isLoading === true || cachedTasks.length !== 0)
      return <></>;
    return <Text style={styles.header}>Нет активных задач</Text>

  }
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '***'
    return dayjs(dateString).format('DD/MM/YYYY HH:mm');
  };
  const handleComplete = async (item: any) => {
    await updateElementToTheFirebase('tasks', { key: item.key, status: 'in_review' });
    console.log("Выполнил")

  };

  return (

    <FlatList
      data={cachedTasks}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <View>
        <TaskCard
              task={item}
              onComplete={handleComplete}
              onInfo={() => setIsConfirmationDialogVisible(true)} />

          <Dialog
            isVisible={isConfirmationDialogVisible}
            onClose={() => setIsConfirmationDialogVisible(false)}
            dialogWidth={'100%'}
            scrollable={false}        >
            <ScrollView contentContainerStyle={{ padding: 16 }}>

              <Text style={styles.header}>{item.title}</Text>
              
              <Text style={styles.header}>Группа</Text>
              
              <Text style={{
                fontSize: 16,
                marginBottom: 4,
                textAlign: 'center'}}>{item.groupName}</Text>
              <Text style={styles.header}>Срок</Text>
              <Text style={{
                fontSize: 16,
                marginBottom: 4,
                textAlign: 'center'
              }}>{item.startTime ? formatDateTime(item.startTime.toDate()) : 'Не указано'}</Text>
              <Text style={{
                fontSize: 16,
                marginBottom: 4,
                textAlign: 'center'
              }}>{item.endTime ? formatDateTime(item.endTime.toDate()) : 'Не указано'}</Text>

              <Text style={styles.header}>Описание</Text>
              <Text style={{
                fontSize: 16, 
                marginBottom: 4,
                textAlign: 'center'
              }}>{item.description}</Text>
            </ScrollView>
          </Dialog>
        </View>
      )}

      ListEmptyComponent={<EmptyList />}
    />
  )
}

export default ActiveTask