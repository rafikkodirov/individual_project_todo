import { View, Text, FlatList, SafeAreaView, ScrollView, TouchableOpacity, Button, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserListCard from '@/components/UserListCard';

import Dialog from '@/components/DialogComponent ';
import styles from "../styles/styles.android"
import { useDataContext } from '@/providers/DataProvider';
import UserSelector from './UserSelector';
import { useLoading } from '@/providers/LoadingProvider';
import { Ionicons } from '@expo/vector-icons';
import UserSelectorAll from './UserSelectorAll';
import { useLocalSearchParams, useRouter } from 'expo-router'; 
const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [usersSearch, setUsersSearch] = useState<any[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [performer, setPerformer] = useState<{ id: string, name: string } | null>(null);
  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
  const [isUserSelectorVisible, setisUserSelectorVisible] = useState(false);
  const { getUsersByGroupId, selectedUserId, selectedGroupId, setSelectedUserId, addUser } = useDataContext();
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoading } = useLoading()
  const [filteredU, setFiltered] = useState<any[]>([]);

  const { getUsers, userData } = useDataContext();
  const { owner , groupId} = useLocalSearchParams()
  useEffect(() => {
    getUsers().then((data) => {
      setUsersSearch(data)
    })
  }, [])
  useEffect(() => {
    setIsOwner(userData.id === owner);
  }, [userData.id, owner]);
  useEffect(() => {
    getUsersByGroupId(groupId.toString()).then((data) => {
      setUsers(data)
    })
  }, [users]) 
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = usersSearch.filter(user =>
      user.nickname.toLowerCase().includes(query.toLowerCase()) &&
      !users.some(groupUser => groupUser.key === user.key) // Фильтруем уже добавленных пользователей
    );
    setFiltered(filtered);
  };

  const displayedUsers = searchQuery.trim()
    ? filteredU
    : usersSearch.filter(user => !users.some(groupUser => groupUser.key === user.key));


  const showSearch = displayedUsers.length > 4
  const ITEM_HEIGHT = 50 
  const router = useRouter()
  useEffect(() => {

    setSelectedUserId(performer)
  }, [])

  const handleUserSelect = async (id: string, name?: string) => {
    const newPerformer = { id, name: name || "Без имени" }; // Если name нет, то "Без имени"

    setSelectedUserId(id);
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
    return <Text style={styles.header}>Нет пользователей</Text>

  }

  // setSelectedGroupId(group.key);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, padding: 20 }}>
          <FlatList
            data={users}
            numColumns={2} // Указываем количество колонок
            style={{ flexGrow: 1 }}
            contentContainerStyle={{ paddingBottom: 16 }}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View style={{ flex: 1, margin: 1 }}>
                <UserListCard users={item} />
              </View>

            )}
            ListEmptyComponent={() => (
              (
                <View style={{ alignItems: "center", marginTop: 20 }}>
                  <Text style={styles.header}>Нет пользователей</Text>
                </View>
              )
            )} />
          {isOwner ? (
            <View style={styles.buttonContainerInDetails}>
              <TouchableOpacity style={styles.buttonInDetails} onPress={() => setConfirmationDialogVisible(true)}>
                <Text style={styles.applyText}>Добавить пользователя</Text>
              </TouchableOpacity>
            </View>) : ('')}
          <Dialog
            isVisible={confirmationDialogVisible} onClose={() => setConfirmationDialogVisible(false)}
            dialogWidth={'100%'}
            scrollable={false}        >
            <View style={{ padding: 16 }}>
              {/* Поле поиска */}
              {showSearch &&
                <TextInput
                  style={styles.searchInput}
                  placeholder="Поиск пользователя..."
                  value={searchQuery}
                  onChangeText={handleSearch}
                />
              }
              <View style={{ maxHeight: ITEM_HEIGHT * 5 }}>
                {/* Список пользователей */}
                <FlatList
                  data={displayedUsers}
                  keyExtractor={item => item.key}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 10,
                        borderBottomWidth: 1,
                      }}
                      onPress={() => handleUserSelect(item.key, item.nickname)}

                    >
                      <Text>{item.nickname}</Text>
                      <Ionicons
                        name={selectedUserId === item.key ? 'radio-button-on' : 'radio-button-off'}
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={() => (
                    (
                      <View style={{ alignItems: "center", }}>
                        <Text style={{...styles.header,fontSize:24}}>Нет пользователей</Text>
                      </View>
                    )
                  )}
                />
              </View>
            </View>
            {displayedUsers.length > 0  ?(
            <View style={{ marginTop: 10 }}>
              <Button title="Добавить" onPress={addUserFunc} color="#007bff" />

            </View>):('')}
          </Dialog>
        </View>
      </SafeAreaView>
    </>
  );
};
export default UserList

