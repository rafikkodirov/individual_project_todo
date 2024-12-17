import { View, Text, Button, Animated, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import TaskCard from '@/components/TaskCard';
import { getItems } from './services/firestore';
import { ScaledStyleSheet } from './ScaledStyleSheet'; 
import { useRouter } from 'expo-router';


const GroupDetailsPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false); // Состояние для отслеживания загрузки

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems: any[] = await getItems("tasks");


      setItems(fetchedItems);
    };

    fetchItems();
  }, []);
  const onRefresh = async () => {
    setRefreshing(true); // Включаем индикатор загрузки
    const fetchedItems: any[] = await getItems("tasks");
    setItems(fetchedItems); // Обновляем данные
    setRefreshing(false); // Выключаем индикатор загрузки
  };
  const router = useRouter()
  const handleTask = () => {
    router.push({
      pathname:"/AddTask"
    })
  }
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
  console.log(items, '11111111111')

  return (
<>
    <FlatList
      data={items} // Передаем данные в FlatList
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
      ListEmptyComponent={<Text>Нет активных задач</Text>}
      
    />
    <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleTask}>
            <Text style={styles.applyText}>Добавить Задачу</Text>
          </TouchableOpacity>
        </View>
  
</>
  )
}
const styles = ScaledStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    overflow: "scroll",
    // backgroundColor: 'red', // Фон для контента
  },
  backRowStyle: {
    flexDirection: "row",
    // backgroundColor: 'red', // Фон для контента
  },
  backButton: {
    padding: 16,
  },
  TextTitle: {
    flexGrow: 1,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center", 
    textAlignVertical: "center", // Vertically align the text (Android only)
    marginRight: 60,
    includeFontPadding: false, // Optional: Remove extra padding for better centering
  },
  
  card: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },



 
  button: {
    marginHorizontal: 16, 
    paddingVertical: 8,
    backgroundColor: '#007BFF', // Цвет фона кнопки
    textAlign: "center",
    alignItems: 'center', // Центрирование по горизонтали
    borderRadius: 10,
    color: 'white',
  },
  
  rowStyle: {
    marginTop: 5, 
    flexDirection: "row",
    alignItems: "flex-start", // Align items at the top for better layout
    flexWrap: "wrap", // Allow wrapping within the row
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  subtitle: {
    // marginTop: 2,
    marginLeft: 10,
    color: "#231F20",
    fontSize: 12,
    flex: 1, // Let the subtitle take the remaining space in the row
    flexWrap: "wrap", // Enable wrapping for the subtitle content
    lineHeight: 16, // Optional: Adjust line height for better readability
  },
  subtitle2: {    
    marginTop: 8,
    color: "#231F20",
    fontSize: 12,
    flex: 1, // Let the subtitle take the remaining space in the row
    flexWrap: "wrap", // Enable wrapping for the subtitle content
    lineHeight: 16, // Optional: Adjust line height for better readability
  },
  mini_title: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexGrow: 1,
    // backgroundColor: 'green', // Фон для контента
    justifyContent: 'flex-end', // Align items to the bottom of the container 
    marginBottom: 32,
  },
  applyText: {
    fontSize: 26,
    color: "#fff",
  },
})

export default GroupDetailsPage
 