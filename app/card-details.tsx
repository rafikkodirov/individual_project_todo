import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { AppVersion, OfferCollection, setItemClick } from "./services/firestore";
import i18n from "@/i18n/i18n";
import { Platform } from 'react-native';
import { decryptString } from "./services/criptograph";

const styles = Platform.OS === 'ios' 
  ? require('../styles/styles.ios').default 
  : require('../styles/styles.android').default; 

const CardDetails = () => {
  // console.log(card.line1, "CardDetails");

  const card = useLocalSearchParams();

  const router = useRouter();
  const handleBackPress = () => {
    router.back()
  };
  const handleGetMoneyPress = async (element: any) => { 
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
    <SafeAreaView style={styles.containerDetails} >
      {/* <View style={styles.backRowStyle}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.BackTextTitle}>{card.name}</Text>
      </View> */}

      <View style={styles.card}>
      <Text style={styles.PageTitle}>{i18n.t('conditions')}:</Text>
        <View style={styles.rowStyle}>
          
          <Text style={styles.subtitle}>{i18n.t('credit_limit')}</Text>
          <Text style={styles.titleDetails}>{card.offer_short_sum}</Text>
        </View>

        <View style={styles.rowStyle}>
          <Text style={styles.subtitle}>{i18n.t('grace_period')}:</Text>
          <Text style={styles.titleDetails}>{card.grace_period}</Text>
        </View>

        <View style={styles.rowStyle}>
          <Text style={styles.subtitle}>{i18n.t('service')}:</Text>
          <Text style={styles.titleDetails}>{card.service}</Text>
        </View>

        <View style={styles.rowStyle}>
          <Text style={styles.subtitle}>{i18n.t('opening_card')}:</Text>
          <Text style={styles.titleDetails}>{card.opening_card}</Text>
        </View>

        <View style={styles.rowStyle}>
          <Text style={styles.subtitle}>{i18n.t('cashback')}:</Text>
          <Text style={styles.titleDetails}>{card.cashback}</Text>
        </View>

        <View style={styles.rowStyle}>
          <Text style={styles.subtitle}>{i18n.t('release_date')}:</Text>
          <Text style={styles.titleDetails}>{card.release_date}</Text>
        </View>



      </View>
      {/* Buttons with actions */}
      <View style={styles.card} >
        <Text style={styles.PageTitle}>{i18n.t('requirements_and_documents')}:</Text>
        <View style={styles.rowStyle}>
          <Text style={styles.subtitle}>{i18n.t('age')}:</Text>
          <Text style={styles.titleDetails}>{card.age}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.subtitle}>{i18n.t('docs')}:</Text>
          <Text style={styles.titleDetails}>{card.docs}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.subtitle}>{i18n.t('registration')}:</Text>
          <Text style={styles.titleDetails}>{card.registration}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.subtitle}>{i18n.t('credits')}:</Text>
          <Text style={styles.titleDetails}>{card.credits}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.subtitle}>{i18n.t('additionally')}:</Text>
          <Text style={styles.titleDetails}>{card.additionally}</Text>
        </View>

      </View >
      <View style={styles.footerContainer}>

        <TouchableOpacity style={styles.applyButtonDetails} onPress={() => handleGetMoneyPress(card)}>
          <Text style={styles.applyTextDetails}>{i18n.t('get_money')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >

  );
};

// const styles = ScaledStyleSheet.create({
//   container: {
//     flex: 1, 
//     paddingTop: 16,
//     // backgroundColor: 'red', // Фон для контента
//   },
//   backRowStyle: {
//     flexDirection: "row",
//   },
//   backButton: {
//     padding: 16,
//   },

//   TextTitle: {
//     flexGrow: 1,
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginRight: 60,
//   },

//   BackTextTitle: {
//     flexGrow: 1,
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     textAlignVertical: "center", // Vertically align the text (Android only)
//     marginRight: 60,
//     includeFontPadding: false, // Optional: Remove extra padding for better centering
//   },
//   /// Footer
//   footerContainer: {
//     display: "flex",
//     flexGrow: 2,
//     minHeight: 80,
//     // backgroundColor: 'green', // Фон для контента
//     justifyContent: 'flex-end',
//     paddingBottom: 16
//   },
//   applyButton: {
//     marginHorizontal: 16,
//     backgroundColor: "#007AFF",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   applyText: {
//     fontSize: 22,
//     color: "#fff",
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 12,
//     marginHorizontal: 16,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 2,
//     width: "auto",
//   },
//   rowStyle: {
//     justifyContent: "space-between", // Distributes space between  
//     marginBottom: 5, // Adds some vertical spacing between rows
//     flexDirection: "row",
//   },
  
//   groupTitle: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginBottom: 8, // Adds some space between the title and the content
//   },
//   title: {
//     fontSize: 14,
//     marginVertical: -1,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     color: "#231F20",
//     fontSize: 14,
//   },
// });

export default CardDetails;
