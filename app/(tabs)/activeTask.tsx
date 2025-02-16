import { View, Text, FlatList, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import TaskCard from '@/components/TaskCard';

import Dialog from '@/components/DialogComponent ';
import { useDataContext } from '@/providers/DataProvider';
import { useLoading } from '@/providers/LoadingProvider';
import { updateElementToTheFirebase } from '../services/firestore';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
const styles = Platform.OS === 'android'
  ? require('../../styles/styles.android').default
  : require('../../styles/styles.android').default;
const ActiveTask: React.FC = () => {
  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState<string>('');

  const { concatenateTasks, userData } = useDataContext();
  const { isLoading } = useLoading()
  const router = useRouter()
  const uniqueTasks = useMemo(() => {
    return concatenateTasks.filter((task, index, self) =>
      index === self.findIndex((t) => t.key === task.key)
    );
  }, [concatenateTasks]);
  const EmptyList = () => {
    if (isLoading === true || uniqueTasks.length !== 0)
      return <></>;
    return <Text style={styles.header}>Нет активных задач</Text>

  }
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '***'
    return dayjs(dateString).format('DD/MM/YYYY HH:mm');
  };
  const handleCompleteForPerformer = async (item: any) => {
    await updateElementToTheFirebase('tasks', { key: item.key, status: 'in_review' });
     setConfirmationDialogVisible('') 

  };


  const handleCompleteForOwner = async (item: any) => {
    await updateElementToTheFirebase('tasks', { key: item.key, status: 'completed' });
    setConfirmationDialogVisible('')
  };
  const handleRefactorForOwner = async (item: any) => {
    await updateElementToTheFirebase('tasks', { key: item.key, status: 'returned' });
    setConfirmationDialogVisible('')
  };
  const handleDeclined = async (item: any) => {
    await updateElementToTheFirebase('tasks', { key: item.key, status: 'declined' });
    setConfirmationDialogVisible('')
  };



  return (

    <FlatList
      data={uniqueTasks}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <View>
          {item.performerId === userData.id && item.status === "in_review" ? (
              <TaskCard task={item} /> 
          ) : item.ownerId === userData.id ? (
            <View>
            <TouchableOpacity onPress={() => setConfirmationDialogVisible(item.key)}>
              <TaskCard
                task={item}
              />
            </TouchableOpacity>
            </View>) : (
              <View>
              <TouchableOpacity onPress={() => setConfirmationDialogVisible(item.key)}>
              <TaskCard
                task={item}
              />
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
                <Text style={styles.header}>Из группы</Text>

                <Text style={{
                  fontSize: 16,
                  marginTop: 5, 
                }}>{item.groupName}</Text></View>
              <View style={styles.rowStyle}>
                <Text style={styles.header}>Дедлайн в</Text>

                <Text style={{
                  fontSize: 16,
                  marginTop: 5,
                  // textAlign: 'center'
                }}>{item.endTime ? formatDateTime(item.endTime.toDate()) : 'Не указано'}</Text>
              </View>

              <Text style={styles.header}>Описание</Text>
              <ScrollView style={{ maxHeight: 150 }}>
                <Text style={{
                  fontSize: 16,
                  marginBottom: 4,
                  textAlign: 'center'
                }}>{item.description}</Text></ScrollView>
              {item.isOwner ? (
                <>
                  <View style={{
                    ...styles.rowStyle,
                    marginTop: "5%",
                  }}>
                    <View style={{ ...styles.buttonContainerInDetails, flexDirection: "row", width: "100%" }}>
                      <TouchableOpacity style={{ ...styles.buttonInDetails, width: 40, height: 40, backgroundColor: "green", justifyContent: "center", alignItems: "center" }} onPress={() => handleCompleteForOwner(item)}>
                        <Ionicons name="checkmark" size={24} color="white" />
                      </TouchableOpacity>

                      <TouchableOpacity style={{ ...styles.buttonInDetails, width: 40, height: 40, backgroundColor: "orange", justifyContent: "center", alignItems: "center" }} onPress={() => handleRefactorForOwner(item)}>
                        <Ionicons name="refresh" size={24} color="white" />
                      </TouchableOpacity>



                      <TouchableOpacity style={{ ...styles.buttonInDetails, width: 40, height: 40, backgroundColor: "red", justifyContent: "center", alignItems: "center" }} onPress={() => handleDeclined(item)}>
                        <Ionicons name="close" size={24} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View style={{ ...styles.buttonContainerInDetails, padding: 0, width: "100%" }}>
                    <TouchableOpacity style={{
                      ...styles.buttonInDetails,
                      marginHorizontal: 0,
                      marginTop: "5%",
                      backgroundColor: "orange"
                    }} onPress={() => handleCompleteForPerformer(item)}>
                      <Text style={{ ...styles.applyText }}>На проверку</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
          </Dialog>
        </View>
      )}

      ListEmptyComponent={<EmptyList />}
    />
  )
}

export default ActiveTask