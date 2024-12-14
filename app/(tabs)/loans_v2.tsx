import { View, Text, FlatList, Alert, SafeAreaView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppVersion, getItems, OfferCollection, setItemClick } from "../services/firestore";
import LoanCard from '@/components/LoanCard';
import { Button, GestureResponderEvent, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
const styles = Platform.OS === 'android' 
  ? require('../../styles/styles.android').default 
  : require('../../styles/styles.ios').default; 
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { Link, router } from 'expo-router'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { ScaledStyleSheet } from '../ScaledStyleSheet';
import i18n from '@/i18n/i18n';
import globalStyles from '@/styles/globalStyles';
import { Loading02Icon } from '@/components/Loading02Icon';
import LoanCardV2 from '@/components/LoanCardV2';
import { decryptString } from '../services/criptograph';
// import LoanCard from '../components/LoanCard';

const LoansV2 = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await getItems(AppVersion.v2, OfferCollection.LOANS);

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
      pathname: '/loan-details-v2',
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
    await setItemClick(AppVersion.v2, OfferCollection.LOANS, element);
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
                <LoanCardV2
                  element={item}
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
// const styles = ScaledStyleSheet.create({
// // const styles = StyleSheet.create({
//   // SafeAreaView container
//   container: {
//     flex: 1, // Ensures it fills the entire screen 
//     paddingTop: 10, // Padding for top and bottom edges 
//   },

//   // Title Text Style
//   TextTitle: {
//     fontSize: 22, // Adjust for a prominent title size
//     fontWeight: 'bold', // Make the title bold
//     textTransform: "uppercase",
//     color: '#333333', // Dark text color
//     marginBottom: 10, // Add spacing after the title
//     marginLeft: 16,    // textAlign: 'start', // Center the title horizontally
//   },

//   // Body Text Style
//   TextBody: {
//     fontSize: 15, // Slightly smaller than the title
//     fontWeight: 'normal', // Regular weight
//     color: '#666666', // A lighter gray for body text
//     lineHeight: 24, // Spacing between lines for better readability 
//     marginHorizontal: 16, // Add some horizontal margins for better readability
//   },

//   // Free Height Filler
//   freeHeight: {
//     flexGrow: 1, // This will fill the remaining vertical space 
//   },

//   listContent: {
//     paddingBottom: 16, // Add padding to ensure the last item isn't cut off
//   },
// })



export default LoansV2

