import { View, Text, FlatList, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import ListOrderFaq from "../assets/images/ListOrderFaq.svg"
import СalculatorFaq from "../assets/images/СalculatorFaq.svg"
import LaptopFaq from "../assets/images/LaptopFaq.svg"
import CheckCircle from "../assets/images/CheckCircle.svg"
import Timer from "../assets/images/Timer.svg" 
import { useLocalSearchParams, useRouter } from 'expo-router' 
import {  TouchableOpacity } from 'react-native'

import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
// import LoanCard from '../components/LoanCard';
// const navigation = useNavigation();
import { getScaleFactor } from './get_scale_coef';
import { ScaledStyleSheet } from './ScaledStyleSheet'
import { Ionicons } from '@expo/vector-icons' 
import i18n from '@/i18n/i18n'
import { decryptString } from './services/criptograph'
const scaleFactor = getScaleFactor();
const RatingMath = () => {
 
  const [loading, setLoading] = useState(true);

  const faq = useLocalSearchParams();

  const router = useRouter(); 
  const handleBackPress = () => {
    router.back()
  };

  const handleCalcPress = async (data: { url: string; name: string }) => { 
    data.url = await decryptString(data.url); 
    router.push({
      // pathname: "/webview",
      pathname:"/webview",
      params: {
        site: data.url, // Pass the URL as `site`
        name: data.name, // Pass the name (optional)
      },
    });
    // Alert.alert("ShareClicked button pressed!");
  };

  return (
    <>
      <ScrollView style={styles.container}>
{/* 
        <View style={styles.backRowStyle}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.TextTitle}>Кредитный рейтинг</Text>
        </View> */}


        <View style={styles.card}>
          <Text style={styles.title}>{i18n.t('credit_calc_card1_title')}</Text>

          <Text style={styles.mini_title}>{i18n.t('credit_calc_card1_subtitle')}</Text>

          <View style={styles.rowStyle}>
            <CheckCircle width={30} height={40} />
            <Text style={styles.subtitle}>{i18n.t('credit_calc_card1_description')}</Text>
          </View>
          <Text style={styles.mini_title}>{i18n.t('credit_calc_card1_subtitle2')}</Text>
          <View style={styles.rowStyle}>
            <Timer width={30} height={40} />
            <Text style={styles.subtitle}>{i18n.t('credit_calc_card1_description2')}</Text>
          </View>
        </View>
        {/* Buttons with actions */}
        <View style={styles.card}>

          <Text style={styles.title}>{i18n.t('credit_calc_card2_title')}</Text>
          <View style={styles.rowStyle}>
            <ListOrderFaq width={30} height={40} />
            <Text style={styles.subtitle}>{i18n.t('credit_calc_card2_description')}</Text>
          </View>
          <View style={styles.rowStyle}>
            <СalculatorFaq width={30} height={40} />
            <Text style={styles.subtitle}>{i18n.t('credit_calc_card2_description2')}</Text>
          </View>
          <View style={styles.rowStyle}>
            <LaptopFaq width={30} height={40} />
            <Text style={styles.subtitle}>{i18n.t('credit_calc_card2_description3')}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>{i18n.t('credit_calc_card3_title')}</Text>
          <Text style={styles.subtitle2}>{i18n.t('credit_calc_card3_description')}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleCalcPress({url: "https://calculator-credit.ru", name: i18n.t('credit_calc_site') })}>
            <Text style={styles.applyText}>{i18n.t('calc')}</Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}

      </ScrollView>
    </>
  );
};
const styles = ScaledStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    overflow: "scroll",
    // backgroundColor: 'red', // Фон для контента
  },
  backRowStyle: {
    flexDirection: "row",
    // backgroundColor: 'red', // Фон для контента
  },
  backButton: {
    padding: 16,
  },
  TextTitle: {
    flexGrow: 1,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center", 
    textAlignVertical: "center", // Vertically align the text (Android only)
    marginRight: 60,
    includeFontPadding: false, // Optional: Remove extra padding for better centering
  },
  
  card: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },



 
  button: {
    marginHorizontal: 16, 
    paddingVertical: 8,
    backgroundColor: '#007BFF', // Цвет фона кнопки
    textAlign: "center",
    alignItems: 'center', // Центрирование по горизонтали
    borderRadius: 10,
    color: 'white',
  },
  
  rowStyle: {
    marginTop: 5, 
    flexDirection: "row",
    alignItems: "flex-start", // Align items at the top for better layout
    flexWrap: "wrap", // Allow wrapping within the row
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  subtitle: {
    // marginTop: 2,
    marginLeft: 10,
    color: "#231F20",
    fontSize: 12,
    flex: 1, // Let the subtitle take the remaining space in the row
    flexWrap: "wrap", // Enable wrapping for the subtitle content
    lineHeight: 16, // Optional: Adjust line height for better readability
  },
  subtitle2: {    
    marginTop: 8,
    color: "#231F20",
    fontSize: 12,
    flex: 1, // Let the subtitle take the remaining space in the row
    flexWrap: "wrap", // Enable wrapping for the subtitle content
    lineHeight: 16, // Optional: Adjust line height for better readability
  },
  mini_title: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexGrow: 1,
    // backgroundColor: 'green', // Фон для контента
    justifyContent: 'flex-end', // Align items to the bottom of the container 
    marginBottom: 32,
  },
  applyText: {
    fontSize: 26,
    color: "#fff",
  },
})



export default RatingMath
