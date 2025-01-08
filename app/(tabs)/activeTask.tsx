import { View, Text, Button, Animated, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { addElementToTheFirebase, getFilteredItemsV2, getItems, WhereCondition } from '../services/firestore'
import TaskCard from '@/components/TaskCard';
import { ScaledStyleSheet } from '../ScaledStyleSheet';
import { getData } from '@/hooks/storageUtils'; 
import { useDataContext, DataType } from '@/providers/DataProvider';


const ActiveTask: React.FC = () => { 
  const [refreshing, setRefreshing] = useState(false);  
  const { cachedTasks, refreshData } = useDataContext(); 
   
  const onRefresh = async () => {
    setRefreshing(true); // Включаем индикатор загрузки 
    await refreshData(DataType.Tasks); 
    setRefreshing(false); // Выключаем индикатор загрузки
  };
  const handleComplete = async () => {
    console.log('Задача завершена'); 
  }; 

  return (

    <FlatList
      data={cachedTasks} // Передаем данные в FlatList
      keyExtractor={(item) => item.key} // Уникальный ключ для каждого элемента
      renderItem={({ item }) => (
        <View>
          <TaskCard
            task={item}
            onComplete={handleComplete} />
        </View>

        //   <View style={{ padding: 8, borderBottomWidth: 1, borderColor: '#ccc' }}>
        //     {/* <Text style={{ fontSize: 16 }}>ID: {item.key}</Text> */}
        //     <Text>Название: {item.title || 'Нет названия'}</Text>
        //     <Text>Описание: {item.description || 'Нет описания'}</Text>
        //   </View>
        // )}
        // ListEmptyComponent={<Text>Нет активных задач</Text>
      )} // Если данных нет
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={<Text style={styles.header}>Нет активных задач</Text>}
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