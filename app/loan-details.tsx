  
  import { ScaledStyleSheet } from "@/app/ScaledStyleSheet";
  import { Ionicons } from "@expo/vector-icons";
  import { useLocalSearchParams, useRouter } from "expo-router";
  import React from "react";
  import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView } from "react-native";
import { AppVersion, OfferCollection, setItemClick } from "./services/firestore";
import i18n from "@/i18n/i18n";
import { Platform } from 'react-native';
import { decryptString } from "./services/criptograph";

const styles = Platform.OS === 'ios' 
  ? require('../styles/styles.ios').default 
  : require('../styles/styles.android').default; 


  const LoanDetails = () => { 

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
      await setItemClick(AppVersion.v1, OfferCollection.LOANS, element);
    };

  

    return (
      <SafeAreaView style={styles.containerDetails}> 
  
        <View style={styles.card}>
          <View style={styles.rowStyle}>
            <Text>{i18n.t('loans_today')}:</Text>
            <Text style={styles.title}>{loan.views}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.rowStyle}>
            <Text style={styles.subtitle}>{i18n.t('advantage')}:</Text>
            <Text style={styles.titleDetails}>{loan.advantage}</Text>
          </View>

          <View style={styles.rowStyle}>
            <Text style={styles.subtitle}>{i18n.t('loan_sum')}:</Text>
            <Text style={styles.titleDetails}>{loan.loan_sum}</Text>
          </View>

          <View style={styles.rowStyle}>
            <Text style={styles.subtitle}>{i18n.t('age')}:</Text>
            <Text style={styles.titleDetails}>{loan.age}</Text>
          </View>

          <View style={styles.rowStyle}>
            <Text style={styles.subtitle}>{i18n.t('docs')}:</Text>
            <Text style={styles.titleDetails}>{loan.docs}</Text>
          </View>

          <View style={styles.rowStyle}>
            <Text style={styles.subtitle}>{i18n.t('schedule')}:</Text>
            <Text style={styles.titleDetails}>{loan.schedule}</Text>
          </View>

          <View style={styles.rowStyle}>
            <Text style={styles.subtitle}>{i18n.t('review_speed')}:</Text>
            <Text style={styles.titleDetails}>{loan.srok}</Text>
          </View>

          <View style={styles.rowStyle}>
            <Text style={styles.subtitle}>{i18n.t('license')}:</Text>
            <Text style={styles.titleDetails}>{loan.license}</Text>
          </View>

        </View>

        {/* Buttons with actions */}
        <View style={styles.card}>
          <ScrollView style={styles.scrolledContainerDetails}>
            <Text style={styles.title}>{i18n.t('about_service')}:</Text>
            <Text style={styles.subtitle}>{loan.offer_detail}</Text>
          </ScrollView>
        </View>
        
        <View style={styles.footerContainer }>
          <TouchableOpacity style={styles.applyButtonDetails} onPress={() => handleGetMoneyPress(loan)}>
            <Text style={styles.applyTextDetails}>{i18n.t('register')}</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    );
  };

   

  export default LoanDetails;
