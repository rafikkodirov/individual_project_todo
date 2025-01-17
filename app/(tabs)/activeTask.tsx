import { View, Text, Button, Animated, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import TaskCard from '@/components/TaskCard';
import { ScaledStyleSheet } from '../ScaledStyleSheet';
import { useDataContext, DataType } from '@/providers/DataProvider';
import { useLoading } from '@/providers/LoadingProvider';


const ActiveTask: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { cachedTasks, refreshData } = useDataContext();
  const { isLoading, setLoading } = useLoading()

  const EmptyList = () => {
    if (isLoading === true || cachedTasks.length !== 0)
      return <></>;
    return <Text style={styles.header}>Нет активных задач</Text>

  }

  // useEffect(() => {
  //   if (cachedTasks && cachedTasks.length > 0) {
  //     setLoading(false); // Выключить загрузку только если есть элементы в cachedTasks
  //   }
  // }, [cachedTasks]);
  useEffect(() => {
    if (cachedTasks && cachedTasks.length > 0) {
      setLoading(false); // Если в cachedTasks есть данные, сразу отключаем loading
    } else {
      // Устанавливаем таймер на 10 секунд
      const timer = setTimeout(() => {
        if (!cachedTasks || cachedTasks.length === 0) {
          setLoading(false); // Если через 10 секунд ничего нет, отключаем loading
        }
      }, 4000);

      // Очистка таймера при изменении cachedTasks или размонтировании
      return () => clearTimeout(timer);
    }
  }, [cachedTasks]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshData(DataType.Tasks);
    setRefreshing(false);
  };

  const handleComplete = async () => {
    // TODO handle complete task
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
const styles = ScaledStyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
})
export default ActiveTask