import { View, Text, FlatList, Alert, ScrollView, SafeAreaView, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AppVersion, getItems, OfferCollection, setItemClick } from "../services/firestore";
import { Dimensions, Platform, Button, GestureResponderEvent, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import globalStyles from '@/styles/globalStyles';
const styles = Platform.OS === 'android' 
  ? require('../../styles/styles.android').default 
  : require('../../styles/styles.ios').default; 
const { width, height } = Dimensions.get('window');
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { Link, router } from 'expo-router'
import PlasticCardCard from '@/components/PlasticCardCard';
import { ScaledStyleSheet } from '../ScaledStyleSheet';
// import LoanCard from '../components/LoanCard';
import { getScaleFactor } from '../get_scale_coef';
import i18n from '@/i18n/i18n';
import { Loading02Icon } from '@/components/Loading02Icon';
import PlasticExpandableCard from '@/components/PlasticExpandableCard';
import { decryptString } from '../services/criptograph';
const scaleFactor = getScaleFactor();

const CardsV2 = () => {
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
      const fetchedItems = await getItems(AppVersion.v2, OfferCollection.CARDS);
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
      pathname: '/loan-details-v2',
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
    await setItemClick(AppVersion.v2, OfferCollection.CARDS, element);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}> 
          <FlatList
            style={styles.freeHeight}
            contentContainerStyle={styles.listContent}
            data={items}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View>
                 <PlasticExpandableCard
                  card={item}
                  onDetailsPress={handleDetailsPress} // Replace with your onDetailsPress logic
                  onApplyPress={handleRegisterPress} // Replace with your onApplyPress logic
                />
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



export default CardsV2

