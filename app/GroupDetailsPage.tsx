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

  const [isOwner, setIsOwner] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [GroupName, setGroupName] = useState<string>('');
  const [GroupId, setGroupId] = useState<string>('');
  const { filteredTasks } = useDataContext();

  const { userData } = useDataContext();
  const { owner } = useLocalSearchParams()
  useEffect(() => {
    setIsOwner(userData.id === owner);
  }, [userData.id, owner]);
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
  }, [GroupId, filteredTasks]);

  const router = useRouter()
  const handleTask = ( ) => {

    router.push({
      pathname: '/add-task',
      params: {
        groupName: GroupName,
        groupId: GroupId
      }
    });

    console.log(GroupId,'id');
    console.log(GroupName);
  }; 

  return (
    <>
      <FlatList
        data={items}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View>
            <TaskCard task={item} />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.header}>Нет активных задач</Text>}
      />
      {isOwner ? (
        <View style={styles.buttonContainerInDetails}>
          <TouchableOpacity style={styles.buttonInDetails} onPress={() => handleTask()}>
            <Text style={styles.applyText}>Добавить Задачу</Text>
          </TouchableOpacity>
        </View>) : ('')}
    </>
  );
}
export default GroupDetailsPage
