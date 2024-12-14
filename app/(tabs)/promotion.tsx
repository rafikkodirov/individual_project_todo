// export default Faq
import { View, Text, FlatList, Alert, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { getItems, OfferCollection } from "../services/firestore";
import "expo-router/entry";
import { SafeAreaView } from 'react-native';
import PigRate from "../../assets/images/PigRate.svg"

import PromotionAd1 from "../../assets/images/PromotionAd1.png"
import PromotionAd2 from "../../assets/images/PromotionAd2.png"
import PromotionAd3 from "../../assets/images/PromotionAd3.png"
import PromotionAd4 from "../../assets/images/PromotionAd4.png"
import PromotionAd5 from "../../assets/images/PromotionAd5.png"
import PromotionAd6 from "../../assets/images/PromotionAd6.png"
import PromotionAd7 from "../../assets/images/PromotionAd7.png"
import PromotionAd8 from "../../assets/images/PromotionAd8.png"

import { Image, GestureResponderEvent, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { Link, router } from 'expo-router'
import { ScaledStyleSheet } from '../ScaledStyleSheet';
import { getScaleFactor } from '../get_scale_coef';
import ActionCard from '@/components/ActionCard';
import globalStyles from '@/styles/globalStyles';
import { decryptString } from '../services/criptograph';

const screenWidth = Dimensions.get('window').width; // Screen width
export const itemWidth = screenWidth / 2 - 10; // Adjust item width (subtract margin)

type BankAction = {
  title: string;
  subTitle: string;
  image: number;
  isFullWidth: boolean;
  themeIndex: number;
  id: string;
  site: string;
}
const bankActionsList: BankAction[] =
  [
    {
      title: "Первый займ бесплатно",
      subTitle: "",
      image: 1,
      isFullWidth: false,
      themeIndex: 1,
      id: "1",
      site: 'U2FsdGVkX1/H6fmAL4V8GJOiBMFqic+90LSBdxvUDaoMFbs2WWha9Z66Ii6L4pSgNK5yYu2HvHG0vwoL06K///92odvv25eu8OWJ8KPkCZlILpRHCILwgQ=='
    },
    {
      title: "Займ без отказов",
      subTitle: "",
      image: 2,
      isFullWidth: false,
      themeIndex: 2,
      id: "2",
      site: 'U2FsdGVkX1/H6fmAL4V8GJOiBMFqic+90LSBdxvUDaoMFbs2WWha9Z66Ii6L4pSgNK5yYu2HvHG0vwoL06K///92odvv25eu8OWJ8KPkCZlILpRHCILwgQ=='
    },
    {
      title: "До 30 000 рублей, до 21 дня",
      subTitle: "- БЕЗ ПРОЦЕНТОВ",
      image: 3,
      isFullWidth: true,
      themeIndex: 3,
      id: "3",
      site: 'U2FsdGVkX1/H6fmAL4V8GJOiBMFqic+90LSBdxvUDaoMFbs2WWha9Z66Ii6L4pSgNK5yYu2HvHG0vwoL06K///92odvv25eu8OWJ8KPkCZlILpRHCILwgQ=='
    },
    {
      title: "Быстрое одобрение",
      subTitle: "",
      image: 4,
      isFullWidth: false,
      themeIndex: 4,
      id: "4",
      site: 'U2FsdGVkX1/H6fmAL4V8GJOiBMFqic+90LSBdxvUDaoMFbs2WWha9Z66Ii6L4pSgNK5yYu2HvHG0vwoL06K///92odvv25eu8OWJ8KPkCZlILpRHCILwgQ=='
    },
    {
      title: "Решение за 1 минуту",
      subTitle: "",
      image: 5,
      isFullWidth: false,
      themeIndex: 5,
      id: "5",
     site: 'U2FsdGVkX1/H6fmAL4V8GJOiBMFqic+90LSBdxvUDaoMFbs2WWha9Z66Ii6L4pSgNK5yYu2HvHG0vwoL06K///92odvv25eu8OWJ8KPkCZlILpRHCILwgQ=='
    },
    {
      title: "Вам одобрено \n20 000₽",
      subTitle: "",
      image: 6,
      isFullWidth: true,
      themeIndex: 6,
      id: "6",
      site: 'U2FsdGVkX1/H6fmAL4V8GJOiBMFqic+90LSBdxvUDaoMFbs2WWha9Z66Ii6L4pSgNK5yYu2HvHG0vwoL06K///92odvv25eu8OWJ8KPkCZlILpRHCILwgQ=='
    },
    {
      title: "Кэшбек с каждого займа",
      subTitle: "",
      image: 7,
      isFullWidth: false,
      themeIndex: 7,
      id: "7",
      site: 'U2FsdGVkX1/H6fmAL4V8GJOiBMFqic+90LSBdxvUDaoMFbs2WWha9Z66Ii6L4pSgNK5yYu2HvHG0vwoL06K///92odvv25eu8OWJ8KPkCZlILpRHCILwgQ=='
    },
    {
      title: "Займ без скрытых комиссий",
      subTitle: "",
      image: 8,
      isFullWidth: false,
      themeIndex: 8,
      id: "8",
      site: 'U2FsdGVkX1/H6fmAL4V8GJOiBMFqic+90LSBdxvUDaoMFbs2WWha9Z66Ii6L4pSgNK5yYu2HvHG0vwoL06K///92odvv25eu8OWJ8KPkCZlILpRHCILwgQ=='
    },
  ]

const scaleFactor = getScaleFactor();
const Faq = () => {
  const [loading, setLoading] = useState(true);



  const handleActionPress = async (element: any) => { 
    const decrypted = await decryptString(element.site); 
    router.push({
      // pathname: "/webview",
      pathname:"/webview",
      params: {
        site: decrypted,
        name: "Акция"
      }
    })
  };

  const processItems = (items: BankAction[]) => {
    const result: BankAction[][] = [];
    let temp: BankAction[] = [];

    items.forEach((item) => {
      if (item.isFullWidth) { // Один элемент после каждых двух
        result.push([item]); // Один элемент занимает всю ширину
      } else {
        temp.push(item);
        if (temp.length === 2) {
          result.push(temp); // Два элемента в одной строке
          temp = [];
        }
      }
    });
    
    

    if (temp.length) result.push(temp); // Добавляем оставшиеся элементы
    return result;
  };


  const processedItems = processItems(bankActionsList);

  return (
    <>
    <FlatList
    style={{...globalStyles.container}}
  data={processedItems}
  keyExtractor={(item, index) => `row-${index}`}
  ListHeaderComponent={
    <Text
      style={{
        ...globalStyles.pageTitleV2,
        marginHorizontal: 8,
        marginBottom: 8,
        textTransform: 'uppercase',
      }}
    >
      Акции
    </Text>
  }
  renderItem={({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      {item.map((subItem) => (
        <View
          key={subItem.id}
          style={{
            width: item.length === 1 ? '100%' : '50%',
          }}
        >
          <ActionCard
            actionContent={subItem}
            onPress={() => handleActionPress(subItem)}
          />
        </View>
      ))}
    </View>
  )}
/>
    {/* <ScrollView style={{...globalStyles.container}}> 
      <Text style={{...globalStyles.pageTitleV2,
        marginHorizontal: 8,
        marginBottom: 8,        
        textTransform: 'uppercase',
          
      }}>Акции</Text>
 
        <FlatList data={processedItems} // Используем обработанный массив
          keyExtractor={(item, index) => `row-${index}`}
          renderItem={({ item }) => (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between', 
              }}>
              {item.map((subItem) => (
                <View
                  key={subItem.id}
                  style={{
                    width: item.length === 1 ? '100%' : '50%', // Полная ширина для одиночного элемента, половина для двух
                    // marginBottom: 5,
                  }}
                >
                  <ActionCard actionContent={subItem} onPress={() => handleActionPress(subItem)}
                  />
                </View>
              ))}
            </View>
          )}
        /> 
      </ScrollView> */}
      </>
  );
};


export default Faq
