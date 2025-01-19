import { View, Text, FlatList, RefreshControl, Platform } from 'react-native'
import React, { useState } from 'react'
import TaskCard from '@/components/TaskCard'; 
import { useDataContext, DataType } from '@/providers/DataProvider';
import { useLoading } from '@/providers/LoadingProvider';
const styles = Platform.OS === 'android'
  ? require('../../styles/styles.android').default
  : require('../../styles/styles.android').default;
const ActiveTask: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { cachedTasks, refreshData } = useDataContext();
  const { isLoading, setLoading } = useLoading()

  const EmptyList = () => {
    if (isLoading === true || cachedTasks.length !== 0)
      return <></>;
    return <Text style={styles.header}>Нет активных задач</Text>

  }


  const onRefresh = async () => {
    setRefreshing(true);
    await refreshData(DataType.Tasks);
    setRefreshing(false);
  };
  const handleComplete = async () => {
    console.log('Задача завершена');
  };

  return (

    <FlatList
      data={cachedTasks}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <View>
          <TaskCard
            task={item}
            onComplete={handleComplete} />
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }

      ListEmptyComponent={<EmptyList />}
    />
  )
}
 
export default ActiveTask