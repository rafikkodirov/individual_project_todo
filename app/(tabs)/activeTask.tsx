import { View, Text, Button, Animated, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { addElementToTheFirebase, getItems } from '../services/firestore'
import TaskCard from '@/components/TaskCard'; 

 
const ActiveTask: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems: any[]= await getItems("tasks");


      setItems(fetchedItems);
    };

    fetchItems();
  }, []);
  const handleComplete = async () => {
    console.log('Задача завершена');

    // const newElement = {
    //   description:"Task1",
    //   startDate: new Date(),
    //   endDate: new Date(),
    //   groupId:"123",
    //   groupName:"School",
    //   isCompleted: false,
    //   isPending: false
    // }
    // await addElementToTheFirebase("/tasks", newElement)
  };
console.log(items,'11111111111')

  return (

    <FlatList
      data={items} // Передаем данные в FlatList
      keyExtractor={(item) => item.key} // Уникальный ключ для каждого элемента
      renderItem={({ item }) => (
        <View>
          <TaskCard
          task={item} 
          onComplete={handleComplete}/>
        </View>
        //   <View style={{ padding: 8, borderBottomWidth: 1, borderColor: '#ccc' }}>
        //     {/* <Text style={{ fontSize: 16 }}>ID: {item.key}</Text> */}
        //     <Text>Название: {item.title || 'Нет названия'}</Text>
        //     <Text>Описание: {item.description || 'Нет описания'}</Text>
        //   </View>
        // )}
        // ListEmptyComponent={<Text>Нет активных задач</Text>
      )
      } // Если данных нет
    />
  )
}

export default ActiveTask