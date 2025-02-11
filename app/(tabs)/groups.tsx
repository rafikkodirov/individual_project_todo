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
  const { setSelectedGroupId } = useDataContext();
  const router = useRouter()
  const handleUser = () => {
    router.push({
      pathname: "/UserList"
    })
  }; 
  const handleGotoGroupDetails = (group: any) => {
    setSelectedGroupId(group.key); 
    router.push({
      pathname: "/GroupDetailsPage",
      params: {
        groupId: group.key,
        name: group.groupName,
      }
    })
  };
 
  return (

    <FlatList
      data={cachedGroups}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <View>
          <TouchableOpacity onPress={() => handleGotoGroupDetails(item)}>
            <GroupCard
              groups={item}
              onDetailsPress={handleUser}
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