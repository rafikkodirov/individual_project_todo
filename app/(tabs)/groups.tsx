import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import GroupCard from '@/components/GroupCard';
import { useRouter } from 'expo-router';
import { ScaledStyleSheet } from '../ScaledStyleSheet';
import { useDataContext, DataType } from '@/providers/DataProvider';
import { useLoading } from '@/providers/LoadingProvider';


const Groups: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading, setLoading } = useLoading()
  const { cachedGroups, refreshData } = useDataContext();
  useEffect(() => {
    setLoading(false)
  }, [cachedGroups]);

  const router = useRouter()
  const handleUser = () => {
    router.push({
      pathname: "/UserList"
    })

  };

  const handleGotoGroupDetails = (group: any) => {
    router.push({
      pathname: "/GroupDetailsPage",
      params: {
        groupId: group.key,
        name: group.groupName,
      }
    })
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshData(DataType.Groups);
    setRefreshing(false);
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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={<Text style={styles.header}>Нет групп</Text>}
    />

  )
}
const styles = ScaledStyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
})
export default Groups