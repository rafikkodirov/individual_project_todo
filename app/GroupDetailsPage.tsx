import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import TaskCard from '@/components/TaskCard';
import { ScaledStyleSheet } from './ScaledStyleSheet';
import { useLocalSearchParams, useRouter } from 'expo-router'; 
import { useDataContext, DataType } from '@/providers/DataProvider';
const GroupDetailsPage: React.FC = () => { 
  const params = useLocalSearchParams(); 
  const [items, setItems] = useState<any[]>([]);
  const [GroupName, setGroupName] = useState<string>('');
  const [GroupId, setGroupId] = useState<string>('');
  const [group, setGroup] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false); // Состояние для отслеживания загрузки
  
  const { refreshData, filteredTasks } = useDataContext(); 

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
 
  useEffect(() => {
    setItems(filteredTasks(GroupId));
  }, [GroupId]);
 


  const onRefresh = async () => {
    setRefreshing(true); // Включаем индикатор загрузки
    await refreshData(DataType.Tasks);
    setItems(filteredTasks(GroupId));
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
  }; 

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
    // marginBottom: 16,
    padding:16,
  },
  applyText: {
    fontSize: 26,
    color: "#fff",
  },
})

export default GroupDetailsPage
