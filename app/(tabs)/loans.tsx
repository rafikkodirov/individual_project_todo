import { View, Text, FlatList, Alert, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppVersion, getItems, OfferCollection, setItemClick } from "../services/firestore";
import LoanCard from '@/components/LoanCard';
import { Button, GestureResponderEvent, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'

import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { Link, router } from 'expo-router'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { ScaledStyleSheet } from '../ScaledStyleSheet';
import i18n from '@/i18n/i18n';
import globalStyles from '@/styles/globalStyles';
import { Loading02Icon } from '@/components/Loading02Icon';
// import LoanCard from '../components/LoanCard';
import { Platform } from 'react-native';
import { decryptString } from '../services/criptograph';
const styles = Platform.OS === 'android' 
  ? require('../../styles/styles.android').default 
  : require('../../styles/styles.ios').default; 
const Loans = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await getItems(AppVersion.v1, OfferCollection.LOANS);

      setItems(fetchedItems);
      setLoading(false);
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
    <View style={globalStyles.loadingContainer}> 
      <Loading02Icon  />
    </View>
    );
  }

  const handleDetailsPress = (loan: any) => {
    // console.log(loan, "handleDetailsPress launched");
    router.push({
      pathname: '/loan-details',
      params: loan
    })
  };

  const handleRegisterPress = async (element: any) => { 
    const decrypted = await decryptString(element.site); 
    router.push({
      // pathname: "/webview",
      pathname:"/webview",
      params: {
        site: decrypted,
        name: element.name
      }
    }) 
    await setItemClick(AppVersion.v1, OfferCollection.LOANS, element);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.TextTitle}>{i18n.t('page_loan_title')}</Text>
          <Text style={styles.TextBody}>{i18n.t('page_loan_description')}</Text>

          <FlatList
            style={styles.freeHeight}
            contentContainerStyle={styles.listContent}
            data={items}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View  >
                <LoanCard
                  loan={item}
                  onDetailsPress={handleDetailsPress}
                  onApplyPress={handleRegisterPress} />
                {/* <Text>{item.name}</Text> */}
              </View>
            )} />
        </View>
      </SafeAreaView>
    </>
  );
};
 


export default Loans

