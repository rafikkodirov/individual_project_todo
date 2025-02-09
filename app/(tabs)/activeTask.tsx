import { View, Text, FlatList, RefreshControl, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import TaskCard from '@/components/TaskCard';

import Dialog from '@/components/DialogComponent ';
import { useDataContext, DataType } from '@/providers/DataProvider';
import { useLoading } from '@/providers/LoadingProvider';
import AddGroupScreen from '../AddGroups';
import TaskDesc from '../TaskDescription';
import { updateElementToTheFirebase } from '../services/firestore';
const styles = Platform.OS === 'android'
  ? require('../../styles/styles.android').default
  : require('../../styles/styles.android').default;
const ActiveTask: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] = useState<boolean>(false);

  const { cachedTasks } = useDataContext();
  const { isLoading, setLoading } = useLoading()

  const [tasks, setTasks] = useState<any[]>([]);
  const EmptyList = () => {
    if (isLoading === true || cachedTasks.length !== 0)
      return <></>;
    return <Text style={styles.header}>Нет активных задач</Text>

  }
  console.log(cachedTasks, 'dddddddddd')

  useEffect(()=>{
    setTasks(cachedTasks)
  }
  )
  const handleComplete = async () => {
    await updateElementToTheFirebase('tasks', {  status: 'in_review' });
console.log("Выполнил")

  };

  return (

    <FlatList
      data={cachedTasks}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <View>
          <TouchableOpacity 
            onPress={() => {
              setIsConfirmationDialogVisible(true); // Открываем диалоговое окно
            }}
          >  <TaskCard
              task={item}
              onComplete={handleComplete} /></TouchableOpacity>

          <Dialog
            isVisible={isConfirmationDialogVisible}
            onClose={() => setIsConfirmationDialogVisible(false)}
            dialogWidth={'100%'}
            scrollable={false}        >  
             <TaskDesc closeModal={() => setIsConfirmationDialogVisible(false)} />
          </Dialog>
        </View>
      )}

      ListEmptyComponent={<EmptyList />}
    />
  )
}

export default ActiveTask