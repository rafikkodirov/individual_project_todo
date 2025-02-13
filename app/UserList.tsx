import { View, Text, FlatList, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserListCard from '@/components/UserListCard';
import { useLocalSearchParams } from 'expo-router'
import { getItems } from './services/firestore';

import styles from "../styles/styles.android"
const UserList = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false); // Управление модалкой
  const [selectedUser, setSelectedUser] = useState(null); // Выбранный пользователь

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await getItems('users');
      setItems(fetchedItems);
      setLoading(false);
    };
    fetchItems();
  }, []);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, padding: 20 }}>
          <FlatList
            style={{ flexGrow: 1 }}
            contentContainerStyle={{ paddingBottom: 16, }}
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View  >
                <UserListCard
                  users={item}
                />

              </View>
            )} />
          <View style={styles.buttonContainerInDetails}>
            <TouchableOpacity
              style={styles.buttonInDetails}
              onPress={() => setModalVisible(true)} // Открываем модалку
            >
              <Text style={styles.applyText}>Добавить Задачу</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
export default UserList

