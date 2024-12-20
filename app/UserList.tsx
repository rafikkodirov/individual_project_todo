import { View, Text, FlatList, Alert, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react' 
import UserListCard from '@/components/UserListCard';
import { Button, GestureResponderEvent, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'

import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { Link, router, useLocalSearchParams } from 'expo-router'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { ScaledStyleSheet } from './ScaledStyleSheet'; 
// import LoanCard from '../components/LoanCard';
import { Platform } from 'react-native'; 
import { getItems } from './services/firestore';
import styles from "../styles_fin2/styles.android" 
const Loans = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const card = useLocalSearchParams();
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
                {/* <Text>{item.name}</Text> */}
              </View>
            )} />
        </View>
      </SafeAreaView>
    </>
  );
};
 


export default Loans

