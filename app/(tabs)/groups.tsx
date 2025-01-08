import { View, Text, Button, Animated, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import GroupCard from '@/components/GroupCard'; 
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { ScaledStyleSheet } from '../ScaledStyleSheet'; 
import { useDataContext, DataType } from '@/providers/DataProvider';
import { SecureStore } from '@/stores/global.store';

 
const Groups: React.FC = () => { 
 const [refreshing, setRefreshing] = useState(false); 
 
 const [userData, setUserData] = useState<any>(null);
 const [whereCondition, setWhereCondition] = useState<any[]>([]);  
 
   const { cachedGroups, refreshData } = useDataContext(); 
 
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
    
    // console.log(group.key, 'group.key//////////////////////////////////////////')
    
    // console.log(group.groupName, 'group.name//////////////////////////////////////////')
  };
  
// console.log(items,'11111111111')
  const onRefresh = async () => {
    setRefreshing(true); // Включаем индикатор загрузки
    await refreshData(DataType.Groups);
    setRefreshing(false); // Выключаем индикатор загрузки
  };
  return (

    <FlatList
      data={cachedGroups} // Передаем данные в FlatList
      keyExtractor={(item) => item.key} // Уникальный ключ для каждого элемента
      renderItem={({ item }) => (
        <View>
          <TouchableOpacity onPress={()=>handleGotoGroupDetails(item)}>
          <GroupCard
          groups={item} 
          onDetailsPress={handleUser} 
          />
          </TouchableOpacity>
        </View>
        
        //   <View style={{ padding: 8, borderBottomWidth: 1, borderColor: '#ccc' }}>
        //     {/* <Text style={{ fontSize: 16 }}>ID: {item.key}</Text> */}
        //     <Text>Название: {item.title || 'Нет названия'}</Text>
        //     <Text>Описание: {item.description || 'Нет описания'}</Text>
        //   </View>
        // )}
        // ListEmptyComponent={<Text>Нет активных задач</Text>
      )
      } // Если данных нет
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