import { View, Text, FlatList, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react' 
import UserListCard from '@/components/UserListCard';
import { useLocalSearchParams } from 'expo-router' 
import { getItems } from './services/firestore';
import styles from "../styles/styles.android" 
const UserList = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();
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
        <View style={{ flex: 1 }}>
          <Text style={styles.TextTitle}>Пользователи</Text>

          <FlatList
            style={styles.freeHeight}
            contentContainerStyle={styles.listContent}
            data={items}
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

