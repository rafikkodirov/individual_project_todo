import { View, Text, FlatList, TouchableOpacity, RefreshControl, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import GroupCard from '@/components/GroupCard';
import { useRouter } from 'expo-router';
import { useDataContext, DataType } from '@/providers/DataProvider';
import { useLoading } from '@/providers/LoadingProvider';
const styles = Platform.OS === 'android'
  ? require('../../styles/styles.android').default
  : require('../../styles/styles.android').default;
const Groups: React.FC = () => {
  const { isLoading, setLoading } = useLoading()
  const { cachedGroups } = useDataContext();
  useEffect(() => {
    setLoading(false)
  }, [cachedGroups]);
  const { setSelectedGroupId , setSelectedGroupName } = useDataContext();
  const router = useRouter()
  const handleUser = (group: any,isOwner: boolean) => {
    setSelectedGroupId(group.key);
    setSelectedGroupName(group.groupName)
    router.push({
      pathname: "/UserList", 
      // params: { owner: isOwner.toString() }
    })
  };
  const handleGotoGroupDetails = (group: any,isOwner: boolean) => {
    setSelectedGroupId(group.key);
    router.push({
      pathname: "/GroupDetailsPage",
      params: {
        groupId: group.key,
        name: group.groupName,
        // owner: isOwner.toString() 
      }
    })

    console.log(group.key)
  };

  return (

    <FlatList
      data={cachedGroups}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <View>
          <TouchableOpacity onPress={() => handleGotoGroupDetails(item,item.isOwner)}>
            <GroupCard
              groups={item}
              onDetailsPress={() => handleUser(item,item.isOwner)}
            />
          </TouchableOpacity>
        </View>
      )
      }
      ListEmptyComponent={<Text style={styles.header}>Нет групп</Text>}
    />
  )
}
export default Groups