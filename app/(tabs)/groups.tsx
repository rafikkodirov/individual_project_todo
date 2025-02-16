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
  
    const { getUsers, userData } = useDataContext();
    const [users, setUsers] = useState<any[]>([]); 
  useEffect(() => {
    setLoading(false)
  }, [cachedGroups]);  
  useEffect(() => {
    getUsersByGroupId().then((data) => {
      setUsers(data)
    })
  }, [users])
  // console.log(usersAll,'dddddddddddd')
  
  const { selectedGroupId, setSelectedGroupId, setSelectedGroup } = useDataContext();
  const router = useRouter()
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
  const handleDeleteGroup = async (group: any) => {
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
              setSelectedGroupId(group.key);
 
              for (const user of users) {
                const userEmail = user.key;
                console.log(userEmail,'dddddde23ddd')
                
                if (userEmail) {
                  try {
                    await deleteDoc(doc(db, `users/${userEmail}/groups`, group.key));
                    console.log(`Документ группы ${group.key} успешно удалён для пользователя ${userEmail}`);
                  } catch (error) {
                    console.error(`Ошибка при удалении документа группы для пользователя ${userEmail}:`, error);
                  }
                }
              }

            } catch (error) {
              console.error(`Ошибка при удалении группы ${group.key}:`, error);
            }
          },100)
        }
        }
      ]
    );
  };
  // const handleDeleteGroup = async (groups: any) => {
  //   console.log("Выполняю")
    
  //   setSelectedGroupId(groups.key)
  //   getUsersByGroupId().then((data) => {
  //     // data — массив документов пользователей с ключами и данными
  //     data.forEach(async (usersAll) => {
  //       // Предположим, что в документе пользователя есть поле email, которое используется для построения пути
  //       const userEmail = usersAll.key;
        
  //       if (userEmail) {
  //         try {
  //           // Формируем путь: users/{userEmail}/groups/{groupId}
  //           await deleteDoc(doc(db, `users/${userEmail}/groups`, groups.key));
            
  //           await deleteDoc(doc(db, `groups/${groups.key}`, groups.key));
  //           console.log(`Документ группы ${groups.key} успешно удалён для пользователя ${userEmail}`);
  //         } catch (error) {
  //           console.error(`Ошибка при удалении документа группы для пользователя ${userEmail}:`, error);
  //         }
  //       }
  //     })}); 
  // };


  const handleGotoGroupDetails = (group: any, ownerId: any) => {
    setSelectedGroupId(group.id);

    router.push({
      pathname: "/GroupDetailsPage",
      params: {
        groupId: group.key,
        name: group.groupName,
        owner: ownerId
      }
    })

  };
  const renderRightActions = (progress: any, dragX: any, group: any) => {

    return (
      <Animated.View style={styles.rightAction}>
        <RectButton style={styles.deleteButton} onPress={() => handleDeleteGroup(group.key)}>
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
        <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}>
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