
import { View, Text, FlatList, Alert, SafeAreaView, ScrollView, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { getItems } from "../services/firestore";
import LoanCard from '@/components/LoanCard';
import { Button, GestureResponderEvent, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'

import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { Link, router } from 'expo-router'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { ScaledStyleSheet } from '../ScaledStyleSheet';
// import LoanCard from '../components/LoanCard';
const styles = Platform.OS === 'android'
  ? require('../../styles_fin2/styles.android').default
  : require('../../styles_fin2/styles.android').default;

import ManFromMenu from "../../assets/images/ManFromMenu.svg"
import AdLoan from "../../assets/images/AdLoan.svg"
import AdCard1 from "../../assets/images/AdCard1.svg"
import AdCard2 from "../../assets/images/AdCard2.svg"
import AdMenu1 from "../../assets/images/AdMenu1.svg"
import globalStyles from '@/styles/globalStyles';
const Main = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleApplyPress = (faq: any) => {
    console.log("clicked")

    router.push({
      pathname: "/credit_rating_calc",
      params: faq
    })
  };

  const handleLoanPress = () => { 
    router.push({
      pathname: '/loans_v2',
    })
  };
  const handleCreditPress = () => {
    router.push({
      pathname: '/cards_v2',
    })
  };
 

  return (
    <ScrollView style={{...globalStyles.container}}> 
      <Text style={globalStyles.pageTitle}>ДОБРО ПОЖАЛОВАТЬ</Text>

      {/* TopCard */}
      <View style={styles.TopCard}>
        <View style={styles.TopCardLeftContent}>
          <Text style={globalStyles.upperCaseText16}>
            Узнайте свой кредитный рейтинг
          </Text>
          <TouchableOpacity style={globalStyles.roundedButton} onPress={handleApplyPress}>
            <Text style={globalStyles.white14Text}>УЗНАТЬ РЕЙТИНГ</Text>
          </TouchableOpacity>
        </View>
        <ManFromMenu style={{ width: "30%" }} width={120} height={120} />
      </View>

      {/* SquareAd */}
      <View style={{ marginTop: 16, height: 140 }}>
        <ScrollView horizontal={true} style={{ ...styles.scrolledSection }}>

          <View style={styles.scrolledSectionCard}>
            <View style={{ ...styles.TopCardLeftContent, width: 200 }}>
              <Text style={globalStyles.upperCaseText16}>Найдем банк, где одобрят кредит</Text>
              <Text style={globalStyles.black12Text}>Получите решение за 5 минут</Text>
            </View>
            <AdMenu1 style={{margin: -12}} width={120} height={120} />

          </View>

          <View style={{ ...styles.scrolledSectionCard, marginLeft: 8 }}>
            <View style={{ ...styles.TopCardLeftContent, width: 200 }}>
              <Text style={globalStyles.upperCaseText16}>Минимальные требования</Text>
              <Text style={globalStyles.black12Text}>Нужен только паспорт и любой кредитный рейтинг</Text>
            </View>
            <AdMenu1 style={{margin: -12}} width={120} height={120} />

          </View>

        </ScrollView>
      </View>


      <View style={{ marginBottom: 32 }}>
        <Text style={{ ...globalStyles.pageTitle, marginTop: 16 }}>КРЕДИТЫ И ЗАЙМЫ</Text>

        <TouchableOpacity style={styles.bottomOffeer} onPress={handleLoanPress}>
          <View style={styles.rowStyleMainV2}>
            <AdLoan style={styles.image} width={60} height={60} />
            <Text style={{ ...globalStyles.upperCaseText16, marginLeft: 16 }}>ПОЛУЧИТЬ ЗАЙМ</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomOffeer} onPress={handleCreditPress}>
          <View style={styles.rowStyleMainV2}>
            <AdCard1 style={styles.image} width={60} height={60} />
            <Text style={{ ...globalStyles.upperCaseText16, marginLeft: 16 }}>ПОДОБРАТЬ КРЕДИТ</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomOffeer} onPress={handleCreditPress}>
          <View style={styles.rowStyleMainV2}>
            <AdCard2 style={styles.image} width={60} height={60} />
            <Text style={{ ...globalStyles.upperCaseText16, marginLeft: 16 }}>ПОДОБРАТЬ КРЕДИТНУЮ КАРТУ</Text>
          </View>
        </TouchableOpacity>
      </View>
 
    </ScrollView >
  );
};
// const styles = ScaledStyleSheet.create({
//   TopCard: {
//     flexDirection: 'row',
//     backgroundColor: '#B1D2FF', // Light blue background
//     borderRadius: 12, // Rounded corners
//     paddingVertical: 4,
//     paddingHorizontal: 16,
//     justifyContent: 'space-between', // Space between text and image
//     marginTop: 16,
//     width: '100%', // Fills the entire width of the parent container
//   },
//   TopCardLeftContent: {
//     flex: 1, // Takes all available space on the left side of ManFromMenu
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     marginVertical: 12,
//     marginHorizontal: 8,
//     width: "70%",
//     alignItems: 'stretch'
//   },
//   scrolledSection: {
//     flexDirection: "row",
//     marginTop: 8,
//     // backgroundColor: 'gray', // Light blue background   
//     // minHeight: 120
//   },
//   scrolledSectionCard: {
//     flexDirection: 'row',
//     backgroundColor: '#E8E9EC', // Light blue background
//     borderRadius: 15, // Rounded corners
//     paddingVertical: 4,
//     paddingLeft: 16,
//     width: 280, // Fills the entire width of the parent container
//     height: 120, // Adjust the height as needed
//     alignItems: 'stretch', // Center items vertically
//   },
//   bottomOffeer: {
//     marginTop: 16,
//     borderWidth: 0.5,
//     borderColor: "#A9A9A9",
//     padding: 8,
//     backgroundColor: "#E8E9EC",
//     borderRadius: 10,
//     justifyContent: "center"
//   },
//   rowStyleMainV2: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
// })



export default Main 