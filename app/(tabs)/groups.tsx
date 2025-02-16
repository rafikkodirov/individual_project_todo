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
  const { setSelectedGroupId, setSelectedGroup } = useDataContext();
  const router = useRouter()
  const handleUser = (group: any, ownerId: any) => {
    setSelectedGroupId(group.key);
    setSelectedGroup(group)
    
    router.push({
      pathname: "/UserList",
      params: {
        owner: ownerId
      }
    })
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

  return (

    <FlatList
      data={cachedGroups}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <View>
          <TouchableOpacity onPress={() => handleGotoGroupDetails(item, item.ownerId)}>
            <GroupCard
              groups={item}
              onDetailsPress={() => handleUser(item, item.ownerId)}
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