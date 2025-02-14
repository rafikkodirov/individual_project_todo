import { View, Text, FlatList, SafeAreaView, ScrollView, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserListCard from '@/components/UserListCard';

import Dialog from '@/components/DialogComponent ';
import styles from "../styles/styles.android"
import { useDataContext } from '@/providers/DataProvider';
import UserSelector from './UserSelector';
import { useLoading } from '@/providers/LoadingProvider';
import { Ionicons } from '@expo/vector-icons';
import UserSelectorAll from './UserSelectorAll';
import { useRouter } from 'expo-router';
const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [performer, setPerformer] = useState<{ id: string, name: string } | null>(null);
  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
  const [isUserSelectorVisible, setisUserSelectorVisible] = useState(false);
  const { getUsersByGroupId, selectedUserId, selectedGroupId, setSelectedUserId, addUser } = useDataContext();
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoading } = useLoading()
  const [filteredGroups, setFilteredGroups] = useState<any[]>([]);


  useEffect(() => {
    getUsersByGroupId().then((data) => {
      setUsers(data)
    })
  }, [])


  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = users.filter(users => users.nickname.toLowerCase().includes(query.toLowerCase()));
    setFilteredGroups(filtered);
  };
  const showSearch = users.length > 7
  const ITEM_HEIGHT = 50
  const displayedUsers = searchQuery.trim() ? filteredGroups : users;

  // const handleUserSelect = (selectedUser: { id: string, name: string }[]) => {
  //   setPerformer({ id: selectedUser[0].id, name: selectedUser[0].name });
  const router = useRouter()
  useEffect(() => {

    setSelectedUserId(performer)
  }, [])

  const handleUserSelect = async (id: string, name: string,) => {

    const newPerformer = { id, name };

    setSelectedUserId(id)
    setPerformer(newPerformer);

  };
  const addUserFunc = async () => {

    if (!performer) {
      alert('Пожалуйста, выберите пользователя!');
      return;
    }
    const newUser = { 
      nickname: performer.name,
    };

    try {
      await addUser(newUser);
      setConfirmationDialogVisible(false)
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  }
  const EmptyList = () => {
    if (isLoading === true || users.length !== 0)
      return <></>;
    return <Text style={styles.header}>Нет активных задач</Text>

  }

  // setSelectedGroupId(group.key);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, padding: 20 }}>
          <FlatList

            data={displayedUsers}
            style={{ flexGrow: 1 }}
            contentContainerStyle={{ paddingBottom: 16, }}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View  >
                <UserListCard
                  users={item}
                />


              </View>

            )} />
          <View style={styles.buttonContainerInDetails}>
            <TouchableOpacity style={styles.buttonInDetails} onPress={() => setConfirmationDialogVisible(true)}>
              <Text style={styles.applyText}>Добавить Задачу</Text>
            </TouchableOpacity>
          </View>
          <Dialog
            isVisible={confirmationDialogVisible} onClose={() => setConfirmationDialogVisible(false)}
            dialogWidth={'100%'}
            scrollable={false}        >
            <View style={{ ...styles.rowStyle, padding: -6 }}>

              <Text style={{ ...styles.header, fontSize: 16 }}>Пользователь : {performer?.name || 'Не выбрана'}</Text>
              <TouchableOpacity onPress={() => setisUserSelectorVisible(true)}>
                <Ionicons name="person" size={22} color="#007AFF" />
              </TouchableOpacity>
            </View>
            <UserSelectorAll visible={isUserSelectorVisible} onClose={() => setisUserSelectorVisible(false)} onSelectUser={handleUserSelect} />
            <View style={{ marginTop: 10 }}>
              <Button title="Добавить" onPress={addUserFunc} color="#007bff" />

            </View>
          </Dialog>
        </View>
      </SafeAreaView>
    </>
  );
};
export default UserList

