import { View, Text, Button, Animated, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import TaskCard from '@/components/TaskCard';
import { getFilteredItems, getItems } from './services/firestore';
import { ScaledStyleSheet } from './ScaledStyleSheet';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface GroupDetailsPageProps {
  element: any,
}

const GroupDetailsPage: React.FC = (GroupDetailsPageProps) => {
  const route = useRouter();
  const params = useLocalSearchParams();

  const [items, setItems] = useState<any[]>([]);
  const [GroupName, setGroupName] = useState<string>('');
  const [GroupId, setGroupId] = useState<string>('');
  const [group, setGroup] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false); // Состояние для отслеживания загрузки
  useEffect(() => {
    try {
      // Получаем параметры и преобразуем их в строку, если это массив
      const _groupName = Array.isArray(params.name) ? params.name[0] : params.name;
      const _groupId = Array.isArray(params.groupId) ? params.groupId[0] : params.groupId;

      // Устанавливаем значения в состояние, если они существуют
      if (_groupName) setGroupName(_groupName);
      if (_groupId) setGroupId(_groupId);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [params]);
  const _groupName = params.groupName
  const _groupId = params.groupId
  console.log(_groupName, 'name')

  console.log(_groupId, 'id')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filteredTasks = await getFilteredItems('/tasks', 'groupId', params?.groupId)
        setItems(filteredTasks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const onRefresh = async () => {
    setRefreshing(true); // Включаем индикатор загрузки
    const fetchedItems: any[] = await getFilteredItems("tasks", 'groupId', params?.groupId);
    setItems(fetchedItems); // Обновляем данные
    setRefreshing(false); // Выключаем индикатор загрузки
  };
  const router = useRouter()
  const handleTask = (items: any[]) => {

    router.push({
      pathname: '/AddTask',
      params: {
        groupName: GroupName,
        groupId: GroupId
      }
      
    });
 
  };
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
  // console.log(items, '11111111111')

  return (
    <>
      <FlatList
        data={items}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View>
            <TaskCard task={item} onComplete={handleComplete} />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<Text style={styles.title}>Нет активных задач</Text>}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleTask(items)}>
          <Text style={styles.applyText}>Добавить Задачу</Text>
        </TouchableOpacity>
      </View>
    </>
  );
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
    fontSize: 25,
    textAlign: "center",
    fontWeight: 'bold',
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
