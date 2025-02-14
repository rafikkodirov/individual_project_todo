import { View, Text, FlatList, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserListCard from '@/components/UserListCard';

import Dialog from '@/components/DialogComponent ';
import styles from "../styles/styles.android"
import { useDataContext } from '@/providers/DataProvider';
import UserSelector from './UserSelector';
import { useLoading } from '@/providers/LoadingProvider';
const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [performer, setPerformer] = useState<{ id: string, name: string } | null>(null);
  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState<string>('');
  const [isUserSelectorVisible, setisUserSelectorVisible] = useState(false);
  const { getUsersByGroupId } = useDataContext();
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
  console.log(displayedUsers,'info')
  
  const handleUserSelect = (id: string, name: string) => {
    setPerformer({ id: id, name: name });
  };

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


        </View>
      </SafeAreaView>
    </>
  );
};
export default UserList

