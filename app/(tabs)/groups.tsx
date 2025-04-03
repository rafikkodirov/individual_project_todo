import { View, Text, FlatList, TouchableOpacity,  Platform, Alert, Animated } from 'react-native'
import React, { useEffect, useMemo,  } from 'react'
import GroupCard from '@/components/GroupCard';
import { useRouter } from 'expo-router';
import { useDataContext,  } from '@/providers/DataProvider';
import { useLoading } from '@/providers/LoadingProvider';
import { db } from '../services/firebaseConfig';

import { Swipeable, RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
const styles = Platform.OS === 'android'
  ? require('../../styles/styles.android').default
  : require('../../styles/styles.android').default;
const Groups: React.FC = () => {
  const { isLoading, setLoading } = useLoading() 
  const { cachedGroups,userData , setSelectedGroupId, deleteGroupOwner, setSelectedGroup } = useDataContext();
  const router = useRouter()
    const uniqueGroups = useMemo(() => {
      return cachedGroups.filter((groups, index, self) =>
        index === self.findIndex((g) => g.key === groups.key)
      );
    }, [cachedGroups]);
 const EmptyList = () => {
    if (isLoading === true || uniqueGroups.length !== 0)
      return <></>;
    return <Text  style={{...styles.header,color:"#5E5E5E",fontWeight:"500",paddingTop:10}}>Создайте первую группу</Text>

  } 
  useEffect(() => {
    setLoading(false)
  }, [cachedGroups]);
 


  const handleUser = (group: any, ownerId: any) => {
    setSelectedGroupId(group.key);
    setSelectedGroup(group)

    router.push({
      pathname: "/users/screens/user-list",
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

                setLoading(true)
                setTimeout(async () => {
                  try {
                    await deleteGroupOwner(groupId, isOwner)

                  } catch (error) {
                    console.error("Ошибка при удалении пользователей:", error);
                  }
                }, 100)
              }
            }
          ]
        )
      ) : (
        Alert.alert(
          "Подтвердите выход",
          "Вы уверены, что хотите выйти из из этой группы?",
          [
            { text: "Отмена", style: "cancel" },
            {
              text: "Удалить",
              style: "destructive",
              onPress: async () => {
                setTimeout(async () => {
                  try {
                    await deleteGroupOwner
                  } catch (error) {
                    console.error("Ошибка при удалении пользователей:", error);
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
      pathname: "/groups/screens/group-details",
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
      ListEmptyComponent={EmptyList}
    />
  )
}
export default Groups