import { View, Text, FlatList, TouchableOpacity, Platform, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import TaskCard from '@/components/TaskCard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDataContext } from '@/providers/DataProvider';

import Dialog from '@/Common/DialogComponent ';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';
import { useTaskActions } from '@/app/tasks/functions/taskActions';
const styles = Platform.OS === 'android'
  ? require('../../../styles/styles.android').default
  : require('../../../styles/styles.android').default;
const GroupDetailsPage: React.FC = () => {
  const params = useLocalSearchParams();
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '***'
    return dayjs(dateString).format('DD/MM/YYYY HH:mm');
  };
  const [isOwner, setIsOwner] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [GroupName, setGroupName] = useState<string>('');
  const [GroupId, setGroupId] = useState<string>('');
  const { filteredTasks } = useDataContext();

  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState<string>('');
  const { userData } = useDataContext();
  const { owner } = useLocalSearchParams()

  const { handleCompleteForPerformer, handleCompleteForOwner, handleRefactorForOwner, handleDeclined } = useTaskActions();
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
  const handleTask = () => {

    router.push({
      pathname: '/tasks/functions/add-task',
      params: {
        groupName: GroupName,
        groupId: GroupId
      }
    });

  };
  const TaskActionButton = ({ item }: { item: any }) => {
    if (owner) {
      return (
        <View style={{
          ...styles.rowStyle,
          marginTop: "5%",
        }}>
          <View style={{ ...styles.buttonContainerInDetails, flexDirection: "row", width: "100%" }}>
            <TouchableOpacity style={{ ...styles.buttonInDetails, 
              width: 85, height: 40, backgroundColor: 
              "green", justifyContent: "center", 
              lignItems: "center" }} onPress={() => handleCompleteForOwner(item,setConfirmationDialogVisible)}>
              <Ionicons name="checkmark" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.buttonInDetails, 
              marginHorizontal: 5, width: 85, 
              height: 40, backgroundColor: "orange",
               justifyContent: "center",
                alignItems: "center" }} onPress={() => handleRefactorForOwner(item,setConfirmationDialogVisible )}>
              <Ionicons name="refresh" size={24} color="white" />
            </TouchableOpacity>



            <TouchableOpacity style={{ ...styles.buttonInDetails, marginRight: "-5%", width: 85, height: 40, backgroundColor: "red", justifyContent: "center", alignItems: "center" }} onPress={() => handleDeclined(item,setConfirmationDialogVisible )}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    else {
      <View style={{ ...styles.buttonContainerInDetails, padding: 0, width: "100%" }}>
        <TouchableOpacity style={{
          ...styles.buttonInDetails,
          marginHorizontal: 0,
          marginTop: "5%",
          backgroundColor: "orange"
        }} onPress={() => handleCompleteForPerformer(item,setConfirmationDialogVisible)}>
          <Text style={{ ...styles.applyText }}>На проверку</Text>
        </TouchableOpacity>
      </View>
    }
  } 

  return (
    <>
      <FlatList
        data={items}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View>
            {item.performerId === userData.id && item.status === "in_review" ? (
              <TaskCard task={item} />
            ) : owner === userData.id ? (
              // Если пользователь является владельцем 
              <View>
                <TouchableOpacity onPress={() => setConfirmationDialogVisible(item.key)}>
                  <TaskCard task={item} />
                </TouchableOpacity>
              </View>) : (
              <View>
                <TouchableOpacity onPress={() => setConfirmationDialogVisible(item.key)}>
                  <TaskCard task={item} />
                </TouchableOpacity>
              </View>
            )}

            <Dialog
              isVisible={confirmationDialogVisible === item.key}
              onClose={() => setConfirmationDialogVisible('')}
              dialogWidth={'100%'}
              scrollable={false}        >
              <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: -2 }}>
                <View style={styles.rowStyle}>
                  <Text style={{
                    fontSize: 16,
                    marginTop: 5,
                  }}>Из группы</Text>

                  <Text style={{
                    ...styles.header, marginVertical: 3
                  }}>{item.groupName}</Text></View>
                <View style={styles.rowStyle}>
                  <Text style={{ fontSize: 16, marginTop: 5, }}>Дедлайн в</Text>

                  <Text style={{
                    ...styles.header, marginVertical: 3
                  }}>{item.endTime ? formatDateTime(item.endTime.toDate()) : 'Не указано'}</Text>
                </View>

                <Text style={styles.header}>Описание</Text>
                <ScrollView style={{ maxHeight: 150 }}>
                  <Text style={{
                    fontSize: 16,
                    marginBottom: 4,
                    textAlign: 'center'
                  }}>{item.description}</Text></ScrollView>

                <TaskActionButton item={item} />

              </ScrollView>
            </Dialog>
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
