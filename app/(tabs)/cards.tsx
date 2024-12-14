import { View, Text, FlatList, Alert, ScrollView, SafeAreaView, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AppVersion, getItems, OfferCollection, setItemClick } from "../services/firestore";
import { Dimensions, Platform, Button, GestureResponderEvent, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import globalStyles from '@/styles/globalStyles';

const { width, height } = Dimensions.get('window');
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { Link, router } from 'expo-router'
import PlasticCardCard from '@/components/PlasticCardCard';
import { ScaledStyleSheet } from '../ScaledStyleSheet';
// import LoanCard from '../components/LoanCard';
import { getScaleFactor } from '../get_scale_coef';
// import { Platform } from 'react-native';
// import styles from "../styles/styles"
const styles = Platform.OS === 'android' 
  ? require('../../styles/styles.android').default 
  : require('../../styles/styles.ios').default; 
import i18n from '@/i18n/i18n';
import { Loading02Icon } from '@/components/Loading02Icon';
import { decryptString } from '../services/criptograph';
const scaleFactor = getScaleFactor();
const Cards = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;

  const opacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await getItems(AppVersion.v1, OfferCollection.CARDS);
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

  const handleDetailsPress = (card: any) => {
    // console.log(card, "handleDetailsPress launched");
    router.push({
      pathname: '/card-details',  // '/details_card',
      params: card
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
    await setItemClick(AppVersion.v1, OfferCollection.CARDS, element);
  };

  return (
    <>
      <SafeAreaView style={styles.containerDetails}>
        <View style={{ flex: 1 }}>
          <Text style={styles.TextTitle}>{i18n.t('page_card_title')}</Text>
          <Text style={styles.TextBody}>{i18n.t('page_card_description')}</Text>
          <FlatList
            style={styles.freeHeight}
            contentContainerStyle={styles.listContent}
            data={items}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View  >
                <PlasticCardCard
                  card={item}
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
//   // SafeAreaView container
//   container: {
//     flex: 1, // Ensures it fills the entire screen 
//     paddingTop: 10, // Padding for top and bottom edges 
//   },

//   // Title Text Style
//   TextTitle: {
//     fontSize: 24, // Adjust for a prominent title size
//     fontWeight: 'bold', // Make the title bold
//     color: '#333333', // Dark text color
//     marginBottom: 10, // Add spacing after the title
//     textAlign: 'center', // Center the title horizontally
//   },

//   // Body Text Style
//   TextBody: {
//     fontSize: 15, // Slightly smaller than the title
//     fontWeight: 'normal', // Regular weight
//     color: '#666666', // A lighter gray for body text
//     lineHeight: 24, // Spacing between lines for better readability
//     textAlign: 'center', // Center-align the body text
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



export default Cards

