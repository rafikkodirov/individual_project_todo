import { View, Text, FlatList, TouchableOpacity, RefreshControl, Platform, Alert, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import GroupCard from '@/components/GroupCard';
import { useRouter } from 'expo-router';
import { useDataContext, DataType } from '@/providers/DataProvider';
import { useLoading } from '@/providers/LoadingProvider';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

import { Swipeable, RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
const styles = Platform.OS === 'android'
  ? require('../../styles/styles.android').default
  : require('../../styles/styles.android').default;
const Groups: React.FC = () => {
  const { isLoading, setLoading } = useLoading()
  const { cachedGroups, getUsersByGroupId } = useDataContext();
  const { selectedGroupId, setSelectedGroupId, setSelectedGroup } = useDataContext();
  const router = useRouter()

  const { getUsers, userData } = useDataContext();
  useEffect(() => {
    setLoading(false)
  }, [cachedGroups]);

  // console.log(usersAll,'dddddddddddd')


  const handleUser = (group: any, ownerId: any) => {
    setSelectedGroupId(group.key);
    setSelectedGroup(group)

    router.push({
      pathname: "/UserList",
      params: {
        owner: ownerId,
        groupId: group.key
      }
    })
  };
  const handleDeleteGroup = async (groupId: any, isOwner: any) => {
    if (userData.id === isOwner) {
      isOwner = true
    }
    else {
      isOwner = false
    }
    console.log(isOwner, 'groupsIDs')
    {
      isOwner ? (
        Alert.alert(
          "Подтвердите удаление",
          "Вы уверены, что хотите удалить эту группу?",
          [
            { text: "Отмена", style: "cancel" },
            {
              text: "Удалить",
              style: "destructive",
              onPress: async () => {
                setTimeout(async () => {
                  try {
                    const users = await getUsersByGroupId(groupId)

                    console.log("Pressed", users);
                    for (const user of users) {

                      console.log(user.key, "user.key...");
                      const userEmail = user.key;

                      if (userEmail) {
                        try {

                          await deleteDoc(doc(db, `groups/${groupId}/users`, userEmail));
                          await deleteDoc(doc(db, `users/${userEmail}/groups`, groupId));
                          console.log(`Документ группы ${groupId} успешно удалён для пользователя ${userEmail}`);
                        } catch (error) {
                          console.error(`Ошибка при удалении документа группы для пользователя ${userEmail}:`, error);
                        }
                      }
                    }

                    await deleteDoc(doc(db, `groups/${groupId}`));
                    // console.log(`Документ группы ${group} успешно удалён для пользователя ${userEmail}`);
                  } catch (error) {
                    console.error(`Ошибка при удалении группы ${groupId}:`, error);
                  }
                }, 100)
              }
            }
          ]
        )
      ) : (
        Alert.alert(
          "Подтвердите выход",
          "Вы уверены, что хотите выйт из из этой группы?",
          [
            { text: "Отмена", style: "cancel" },
            {
              text: "Удалить",
              style: "destructive",
              onPress: async () => {
                setTimeout(async () => {
                  try {
                    const users = await getUsersByGroupId(groupId)

                    if (userData.id) {
                      try {

                        await deleteDoc(doc(db, `groups/${groupId}/users`, userData.id));
                        await deleteDoc(doc(db, `users/${userData.id}/groups`, groupId));
                        console.log(`Документ группы ${groupId} успешно удалён для пользователя ${userData.id}`);
                      } catch (error) {
                        console.error(`Ошибка при удалении документа группы для пользователя ${userData.id}:`, error);
                      }
                    }
                    // console.log(`Документ группы ${group} успешно удалён для пользователя ${userEmail}`);
                  } catch (error) {
                    console.error(`Ошибка при удалении группы ${groupId}:`, error);
                  }
                }, 100)
              }
            }
          ]
        )
      )
    }
  };

  const handleGotoGroupDetails = (group: any, ownerId: any) => {
    setSelectedGroupId(group.key);

    router.push({
      pathname: "/GroupDetailsPage",
      params: {
        groupId: group.key,
        name: group.groupName,
        owner: ownerId
      }
    })

  };
  const renderRightActions = (progress: any, dragX: any, group: any, isOwner: any) => {

    return (
      <Animated.View style={styles.rightAction}>
        <RectButton style={styles.deleteButton} onPress={() => handleDeleteGroup(group.key, group.ownerId)}>
          <Ionicons name={'trash-outline'} size={30} color={"red"} />
        </RectButton>
      </Animated.View>
    );
  };
  return (

    <FlatList
      data={cachedGroups}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item, item.isOwner)}>
          <View>
            <TouchableOpacity onPress={() => handleGotoGroupDetails(item, item.ownerId)}>
              <GroupCard
                groups={item}
                onDetailsPress={() => handleUser(item, item.ownerId)}
              // onDetailsPress={() => handleDeleteGroup(item)}
              />
            </TouchableOpacity>
          </View></Swipeable>
      )
      }
      ListEmptyComponent={<Text style={styles.header}>Нет групп</Text>}
    />
  )
}
export default Groups