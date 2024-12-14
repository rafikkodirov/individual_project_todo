import { View, Text, FlatList, Alert, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppVersion, getItems, OfferCollection } from "../services/firestore";
import "expo-router/entry";
import { SafeAreaView } from 'react-native';
import PigRate from "../../assets/images/PigRate.svg"

import faq1 from "../../assets/images/faq1.png"
import faq2 from "../../assets/images/faq2.png"
import faq3 from "../../assets/images/faq3.png"
import faq4 from "../../assets/images/faq4.png"

import { Image, GestureResponderEvent, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { Link, router } from 'expo-router'
import { ScaledStyleSheet } from '../ScaledStyleSheet';
import { getScaleFactor } from '../get_scale_coef';
import i18n from '@/i18n/i18n';
import globalStyles from '@/styles/globalStyles';
import { Loading02Icon } from '@/components/Loading02Icon';

const screenWidth = Dimensions.get('window').width; // Screen width
export const itemWidth = screenWidth / 2 - 10; // Adjust item width (subtract margin)

const scaleFactor = getScaleFactor();
const Faq = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await getItems(AppVersion.v1, OfferCollection.FAQ);

      setItems(fetchedItems);
      setLoading(false);
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <View style={globalStyles.loadingContainer}>
        <Loading02Icon />
      </View>
    );
  }

  const handleDetailsPress = (faq: any) => {

    router.push({
      pathname: '/faq_details',
      params: faq,
    })
  };


  // interface LoanCardProps {
  //   faq: any;  // URL or image source

  //   onDetailsPress: (faq: any) => void;
  //   onApplyPress: (faq: any) => void;
  // }

  const handleApplyPress = (faq: any) => {
    // console.log("clicked")

    router.push({
      pathname: "/credit_rating_calc",
      params: faq
    })
  };

  const getFaqImage = (index: number) => {
    return index === 1 ? faq1 : index === 2 ? faq2 : index === 3 ? faq3 : faq4
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ flex: 1 }}>
        <Text style={styles.TextTitle}>{i18n.t('page_faq_title')}</Text>

        <View style={styles.squareAD}>
          <Text style={styles.titleSquare}>{i18n.t('credit_calc_title')}</Text>
          <View style={styles.rowStyle}>
            <Text style={styles.subtitleSquare}>{i18n.t('credit_calc_details')}</Text>
            <PigRate width={80} height={80} />
          </View>


          <TouchableOpacity style={styles.applyButtonCARD} onPress={handleApplyPress}>
            <Text style={styles.applyText}>{i18n.t('calc_free')}</Text>
          </TouchableOpacity>
        </View>


        <FlatList
          contentContainerStyle={styles.grid}
          style={{ flex: 1 }}
          data={items}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleDetailsPress(item)}
              style={styles.itemContainer}
            >
              <Image
                source={getFaqImage(item.image)}
                style={styles.icon}
              />
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <Text style={styles.subtitle}>{item.category}</Text>
            </TouchableOpacity>
          )}
        />
      </View>


    </SafeAreaView>

  );
};
const styles = ScaledStyleSheet.create({
  container: {
    flex: 1,
  },

  applyText: {
    fontSize: 16,
    color: "#fff",
  },

  squareAD: {
    borderWidth: 0.5,
    borderColor: "#A9A9A9",
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  rowStyle: {
    flexGrow: 1,
    justifyContent: "space-between", // Distributes space between elements
    flexDirection: "row",
    marginVertical: 8,
  },
  grid: {
    // paddingBottom: 16, // Optional: Add padding to the grid
    borderColor: "#b93241",
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  itemContainer: {
    flex: 1, // Ensure items fill available space
    margin: 8, // Space between items
    backgroundColor: '#fff',
    // alignItems: 'center',
    borderRadius: 8,
    width: itemWidth,
    height: itemWidth, // Adjust height for the grid cells
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // For Android shadow
    padding: 12,
    flexDirection: "column",
    justifyContent: "space-between", // Distributes space between elements 
    overflow: "hidden",

  },
  verticalContainerSpaceBetween: {
    justifyContent: "space-between", // Distributes space between elements 
    flexDirection: "column",
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  icon: {
    resizeMode: "contain",
    width: 80,
    zIndex: 3,
    height: "40%",
    // backgroundColor: "#000",
    marginBottom: 10,
  },



  titleSquare: {
    fontSize: 18,
    marginVertical: -4,
    fontWeight: "bold",
  },
  subtitleSquare: {
    marginTop: 5,
    width: "80%",
    fontSize: 12,
  },

  titleContainer: {
    marginBottom: 5,
    flex: 1,
    flexGrow: 1,
    justifyContent: 'flex-end', // Align items to the bottom 

  },
  title: {
    fontSize: 12,
    // width:2,
    fontWeight: 'bold',
    // textAlign: 'center',
    marginBottom: 5,
    color: '#000',
  },
  subtitle: {
    color: "#231F20",
    fontSize: 9,
  },
  category: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },


  TextTitle: {
    fontSize: 24, // Размер шрифта
    fontWeight: 'bold', // Жирный шрифт
    textAlign: 'center', // Выравнивание по центру
    margin: 10, // Отступ снизу
  },
  TextBody: {
    fontSize: 16, // Размер шрифта
    fontWeight: '600', // Жирность текста (можно отрегулировать до 'bold', если нужно жирнее)
    textAlign: 'center', // Выравнивание по центру
    color: '#555', // Дополнительно можно задать цвет текста
  },
  applyButtonCARD: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    width: "auto",
    alignItems: "center",
  },



})



export default Faq
