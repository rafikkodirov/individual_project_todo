// import { Button, GestureResponderEvent, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
// import { Link, router } from 'expo-router'
import { Dimensions } from 'react-native';
 
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { getScaleFactor } from './get_scale_coef';
import { ScaledStyleSheet } from './ScaledStyleSheet';
const scaleFactor = getScaleFactor();
const IndexScreen = () => {
  const router = useRouter(); // Инициализируем router
  const isMounted = useRef(false);
  const [isWelcomeShowed, setIsWelcomeShowed] = useState('false');

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => { 
      
      if (isMounted.current) {
        setTimeout(() => {
          // if (value === "true") {
          //   router.replace('/main');
          //   // router.replace('/(tabs)/loans'); // Переход на другой экран
          // } else {
            router.replace('/sign-in'); // Переход на другой экран
          // }
        }, 1); // 3 seconds delay
      }
    };

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, []);


 

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/react_logo.png')} // Укажите путь к вашему логотипу
        style={styles.logo}
      // resizeMode="contain"
      />
    </View>
  );
};

const styles = ScaledStyleSheet.create({
  container: {
    flex: 1,
    padding: 100 , 
    width: "100%", // Ширина логотипа
    height: "50%",
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue'  , // Цвет фона можно изменить
  },
  logo: {

    // marginHorizontal:"-50%",
    width: "150%", // Ширина логотипа
    height: "50%", // Высота логотипа
  },
});

export default IndexScreen;
 