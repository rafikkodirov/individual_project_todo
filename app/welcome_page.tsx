import { Button, GestureResponderEvent, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { Link, router, useRouter } from 'expo-router'
import { getScaleFactor } from './get_scale_coef';
const scaleFactor = getScaleFactor();
import { storeData } from '@/hooks/storageUtils';
import { ScaledStyleSheet } from './ScaledStyleSheet';
import i18n from '@/i18n/i18n';
import { Platform } from 'react-native';
const styles = Platform.OS === 'android' 
  ? require('../styles/styles.android').default 
  : require('../styles/styles.ios').default; 

const imagges = [
  require("../assets/images/AdS1.png"),
  require("../assets/images/AdS2.png"),
  require("../assets/images/AdS3.png")
]

const completeWelcomeRoute = "/main";

const Index = () => {

  const titles = [
    [i18n.t('welcome1_1'), i18n.t('welcome1_2')],
    [i18n.t('welcome2_1'), i18n.t('welcome2_2')],
    [i18n.t('welcome3_1'), i18n.t('welcome3_2')],
  ]


  // console.log(titles);

  const router = useRouter();

  const completeWelcome = async () => {
    await storeData('isWelcomeShowed', 'true');
    router.replace(completeWelcomeRoute);
  };
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState(titles[page]);
  const [imagge, setImage] = useState(imagges[page])
  const handlePress = async () => {
    if (page >= 2) {

      await storeData('isWelcomeShowed', 'true');  // Wait for storage to complete
      router.replace(completeWelcomeRoute);
    } else {
      setImage(imagges[page + 1])
      setTitle(titles[page + 1])
      setPage(page + 1)
    }
  };
  const currentImage = imagges[page]
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={styles.bannerCard}>
          <ImageBackground
            resizeMode="contain"
            source={imagge}
            style={currentImage === imagges[2] ? styles.bannerAdS3 : styles.banner}>

          </ImageBackground>

          <Text style={styles.TextTitle}>{title[0]}</Text>
          <Text style={styles.TextAfterTitle}>{title[1]}</Text>
        </View>

        <View style={styles.ROW}>
          <View style={page === 0 ? styles.miniActiveButton : styles.miniButton} />
          <View style={page === 1 ? styles.miniActiveButton : styles.miniButton} />
          <View style={page === 2 ? styles.miniActiveButton : styles.miniButton} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>{i18n.t('start')}</Text>
        </TouchableOpacity>
        <Link href="/main">{i18n.t('skip')}</Link>

      </View>
    </SafeAreaView>
  );

}

// const styles = ScaledStyleSheet.create({
//   safeArea: {
//     flexGrow: 1,
//     paddingHorizontal: 4,
//     paddingBottom: 24,
//     backgroundColor: '#D9D9D9',
//   },

//   Skip: {
//     // marginBottom: 20
//   },
//   box: {
//     padding: 24
//   },
//   bannerAdS3: {
//     flex: 1,
//     // elevation: 33,
//     zIndex: 0,
//     alignItems: 'center',
//     width: '100%',
//     // marginStart:"12%",
//     // marginStart:"22%",
//     padding: 6,
//     // height:"80%"
//     // Убедитесь, что изображение растягивается корректно
//   },
//   TextTitle: {
//     textAlign: "center",
//     justifyContent: "center",
//     fontSize: 26,
//     fontFamily: "inter_semi_bold",
//     fontWeight: 'bold',
//     color: 'black',
//     // lineHeight:6.5
//   }
//   ,
//   TextAfterTitle: {
//     fontSize: 16,
//     textAlign: "center",
//     justifyContent: "center",
//     fontFamily: "inter_regular",
//     color: 'black',
//   },
//   ROW: {
//     flexDirection: 'row',
//     // flex:
//     gap: 12,
//     zIndex: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: "-15%",
//     // marginTop:"",
//     // marginTop:-20,
//     // marginHorizontal: -20 
//   },
//   miniButton: {
//     width: 16,
//     height: 16,
//     zIndex: 1,

//     // marginBottom:-15,
//     backgroundColor: "#B2B2B2",
//     borderRadius: 5
//   },
//   miniActiveButton: {
//     width: 16,
//     height: 16,
//     // marginBottom:-15,
//     zIndex: 1,
//     backgroundColor: 'blue',
//     borderRadius: 5
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     backgroundColor: '#D9D9D9',
//     // zIndex: 0,
//   },
//   banner: {
//     flex: 1,
//     // elevation: 33,
//     zIndex: 0,
//     alignItems: 'center',
//     width: '100%',
//     // marginStart:"22%",
//     // padding:30,
//     // height:"80%"
//     // Убедитесь, что изображение растягивается корректно
//   },
//   bannerCard: {

//     // marginBottom: -40,
//     borderRadius: 30,
//     // flex: 1,
//     // zIndex: 33,
//     margin: 16,
//     alignItems: 'center',
//     width: '94%',
//     // height: 1040/2,
//     height: "73%",
//     padding: 15,
//     backgroundColor: '#FFF',
//     // Убедитесь, что изображение растягивается корректно
//   },
//   buttonText: {
//     textAlign: "center",
//     fontSize: 20,
//     color: 'white',
//   },
//   button: {
//     marginTop: 100,
//     justifyContent: 'flex-end',
//     marginBottom: 20,
//     backgroundColor: '#007BFF', // Цвет фона кнопки
//     padding: 15,
//     textAlign: "center",
//     // alignItems: 'center', // Центрирование по горизонтали
//     width: 300,
//     borderRadius: 20,
//     fontSize: 22,
//     color: 'white',
//   },
// })
export default Index
