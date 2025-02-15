import { View, Text, FlatList, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import TaskCard from '@/components/TaskCard';

import Dialog from '@/components/DialogComponent ';
import { useDataContext } from '@/providers/DataProvider';
import { useLoading } from '@/providers/LoadingProvider';
import { updateElementToTheFirebase } from '../services/firestore';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
const styles = Platform.OS === 'android'
  ? require('../../styles/styles.android').default
  : require('../../styles/styles.android').default;
const ActiveTask: React.FC = () => {
  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState<string>('');

  const { concatenateTasks } = useDataContext();
  const { isLoading } = useLoading()
  const router = useRouter()
  const EmptyList = () => {
    if (isLoading === true || concatenateTasks.length !== 0)
      return <></>;
    return <Text style={styles.header}>Нет активных задач</Text>

  }
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '***'
    return dayjs(dateString).format('DD/MM/YYYY HH:mm');
  };

   
   


  const handleCompleteForPerformer = async (item: any) => {
    await updateElementToTheFirebase('tasks', { key: item.key, status: 'in_review' });
    console.log("Выполнил")

  };

  const handleCompleteForOwner = async (item: any) => {
    await updateElementToTheFirebase('tasks', { key: item.key, status: 'completed' });
    setConfirmationDialogVisible('')
    console.log("Выполнил")
  };

  const handleDeclinedForOwner = async (item: any) => {
    await updateElementToTheFirebase('tasks', { key: item.key, status: 'declined-pending' });
    setConfirmationDialogVisible('')
    console.log("Выполнил")
  };

  return (

    <FlatList
      data={concatenateTasks}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <View>
          <TouchableOpacity onPress={() => setConfirmationDialogVisible(item.key)}>
            <TaskCard
              task={item}
            />
          </TouchableOpacity>
          <Dialog
            isVisible={confirmationDialogVisible === item.key}
            onClose={() => setConfirmationDialogVisible('')}
            dialogWidth={'100%'}
            scrollable={false}        >
            <ScrollView contentContainerStyle={{ padding: 16 }}>


              <Text style={{
                ...styles.header,
                fontSize: 24,
              }}>{item.title}</Text>
              <View style={styles.rowStyle}>
                <Text style={styles.header}>Группа</Text>

                <Text style={{
                  fontSize: 16,
                  marginTop: 5,
                  marginBottom: "10%"
                }}>{item.groupName}</Text></View>
              <View style={styles.rowStyle}>
                <Text style={styles.header}>Дедлайн</Text>

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
                  <View style={{...styles.rowStyle,
                        marginTop:"5%",}}>
                    <View style={{ ...styles.buttonContainerInDetails, padding: 4, width: "50%" }}>
                      <TouchableOpacity style={{
                        ...styles.buttonInDetails,
                        marginHorizontal: 0,
                        backgroundColor: "green"
                      }} onPress={() => handleCompleteForOwner(item)}>
                        <Text style={styles.applyText}>Принять</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.buttonContainerInDetails, padding: 4, width: "50%" }}>
                      <TouchableOpacity style={{
                        ...styles.buttonInDetails,
                        marginHorizontal: 0,

                        backgroundColor: "orange"
                      }} onPress={() => handleDeclinedForOwner(item)} >
                        <Text style={styles.applyText}>Вернуть</Text>
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
                        marginTop:"5%",
                        backgroundColor: "orange"
                      }} onPress={() => handleCompleteForPerformer(item)}>
                        <Text style={{...styles.applyText}}>На проверку</Text>
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