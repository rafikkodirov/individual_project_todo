  
  import { ScaledStyleSheet } from "@/app/ScaledStyleSheet";
import i18n from "@/i18n/i18n";
  import { Ionicons } from "@expo/vector-icons";
  import { useLocalSearchParams, useRouter } from "expo-router";
  import React from "react";
  import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView, Platform } from "react-native";
import { decryptString } from "./services/criptograph";

  const styles = Platform.OS === 'android'
  ? require('../styles_fin2/styles.android').default
  : require('../styles_fin2/styles.android').default;



  const LoanDetailsV2 = () => {
    // console.log(card.line1, "CardDetails");

    const loan = useLocalSearchParams();

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
    };

  

    return (
      <SafeAreaView style={styles.containerOfferV2}>

        {/* <View style={styles.backRowStyle}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.TexttitleOfferV2}>{loan.name}</Text>
        </View>
   */}
        <View style={styles.ViewsCard}>
          <View style={styles.rowStyle}>
            <Text style={styles.subtitleOfferV2OfferV2}>{i18n.t('views')}:</Text>
            <Text style={styles.titleOfferV2}>{loan.views}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.rowStyle}>
            <Text style={styles.subtitleOfferV2OfferV2}>{i18n.t('advantage')}:</Text>
            <Text style={styles.titleOfferV2}>{loan.advantage}</Text>
          </View>

          <View style={styles.rowStyle}>
            <Text style={styles.subtitleOfferV2OfferV2}>{i18n.t('loan_sum')}:</Text>
            <Text style={styles.titleOfferV2}>{loan.loan_sum}</Text>
          </View>

          <View style={styles.rowStyle}>
            <Text style={styles.subtitleOfferV2OfferV2}>{i18n.t('age')}:</Text>
            <Text style={styles.titleOfferV2}>{loan.age}</Text>
          </View>

          <View style={styles.rowStyle}>
            <Text style={styles.subtitleOfferV2OfferV2}>{i18n.t('docs')}:</Text>
            <Text style={styles.titleOfferV2}>{loan.docs}</Text>
          </View>

          <View style={styles.rowStyle}>
            <Text style={styles.subtitleOfferV2OfferV2}>{i18n.t('schedule')}:</Text>
            <Text style={styles.titleOfferV2}>{loan.schedule}</Text>
          </View>

          <View style={styles.rowStyle}>
            <Text style={styles.subtitleOfferV2OfferV2}>{i18n.t('review_speed')}:</Text>
            <Text style={styles.titleOfferV2}>{loan.srok}</Text>
          </View>

          <View style={styles.rowStyle}>
            <Text style={styles.subtitleOfferV2OfferV2}>{i18n.t('license')}:</Text>
            <Text style={styles.titleOfferV2}>{loan.license}</Text>
          </View>

        </View>

        {/* Buttons with actions */}
        <View style={styles.DescribeCard}>
          <ScrollView style={styles.scrolledContainer}>
            <Text style={styles.titleOfferV2}>{i18n.t('about_service')}:</Text>
            <Text style={styles.subtitleOfferV2OfferV2}>{loan.offer_detail}</Text>
          </ScrollView>
        </View>
        
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.applyButtonOfferV2} onPress={() => handleGetMoneyPress(loan)}>
            <Text style={styles.applyText}>{i18n.t('get_money')}</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    );
  };

  // const styles = ScaledStyleSheet.create({
  //   container: {
  //     flex: 1,
  //     // flexGrow: 1,
  //     paddingTop: 16,
  //     // backgroundColor: 'red', // Фон для контента
  //   },
  //   backRowStyle: { 
  //     flexDirection: "row",
  //   },
  //   backButton: {
  //     padding: 16,
  //   },  
  //   TexttitleOfferV2: {
  //     flexGrow: 1,
  //     fontSize: 24,
  //     fontWeight: "bold",
  //     textAlign: "center", 
  //     textAlignVertical: "center", // Vertically align the text (Android only)
  //     marginRight: 60,
  //     includeFontPadding: false, // Optional: Remove extra padding for better centering
  //   }, 
  //   ViewsCard:{
  //     backgroundColor: "#f5f5f5",
  //     borderRadius: 16,
  //     padding: 12,
  //     borderWidth:0.5,
  //     borderColor:"#0163FA",
  //     marginHorizontal: 16,
  //     marginBottom: 16,
  //   },
  //   DescribeCard: {
  //     backgroundColor: "#f5f5f5",
  //     borderRadius: 16,
  //     padding: 12,
  //     marginHorizontal: 16,
   
  //     marginBottom: 16,
  //   },
  //   card: {
  //     backgroundColor: "#fff",
  //     borderRadius: 16,
  //     padding: 12,
  //     marginHorizontal: 16,
   
  //     marginBottom: 16,
  //   },

    
  //   scrolledContainer: {
  //     display: "flex",
  //     flexGrow: 1,
  //     overflow: "scroll",
  //     maxHeight: 200,    
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
  //     padding: 16,
  //     borderRadius: 12,
  //     alignItems: "center",
  //   },
  //   applyText: {
  //     fontWeight:"bold",
  //     fontSize: 14,
  //     color: "#fff", 
  //   },




    
    
  //   rowStyle: {
  //     justifyContent: "space-between", // Distributes space between elements
  //     marginBottom: 5, // Adds some vertical spacing between rows
  //     flexDirection: "row",
  //   },

  //   titleOfferV2: {
  //     fontSize: 14,
  //     marginVertical: -1,
  //     fontWeight: "bold",
  //   },
  //   subtitleOfferV2OfferV2: {
  //     color: "#231F20",
  //     fontSize: 14,
  //   },
    
  // });

  export default LoanDetailsV2;
