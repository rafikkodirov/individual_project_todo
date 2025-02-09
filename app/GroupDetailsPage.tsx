import { View, Text, FlatList, RefreshControl, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import TaskCard from '@/components/TaskCard';
import { useLocalSearchParams, useRouter } from 'expo-router'; 
import { useDataContext, DataType } from '@/providers/DataProvider';
const styles = Platform.OS === 'android'
  ? require('../styles/styles.android').default
  : require('../styles/styles.android').default;
const GroupDetailsPage: React.FC = () => { 
  const params = useLocalSearchParams(); 
  const [items, setItems] = useState<any[]>([]);
  const [GroupName, setGroupName] = useState<string>('');
  const [GroupId, setGroupId] = useState<string>('');  
  const {  filteredTasks } = useDataContext(); 

  useEffect(() => {
    try { 
      const _groupName = Array.isArray(params.name) ? params.name[0] : params.name;
      const _groupId = Array.isArray(params.groupId) ? params.groupId[0] : params.groupId; 
      if (_groupName) setGroupName(_groupName);
      if (_groupId) setGroupId(_groupId);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [params]);
 
  useEffect(() => {
    setItems(filteredTasks(GroupId));
  }, [GroupId]);
 

 
 
  const router = useRouter()
  const handleTask = (items: any[]) => {

    router.push({
      pathname: '/add-task',
      params: {
        groupName: GroupName,
        groupId: GroupId
      }
    });
    
    console.log('Задача завершена'); 
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
        ListEmptyComponent={<Text style={styles.header}>Нет активных задач</Text>}
      />
      <View style={styles.buttonContainerInDetails}>
        <TouchableOpacity style={styles.buttonInDetails} onPress={() => handleTask(items)}>
          <Text style={styles.applyText}>Добавить Задачу</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}  
export default GroupDetailsPage
