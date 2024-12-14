import { View, Text, FlatList, Alert, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import RateLikeFaq from "../assets/images/RateLikeFaq.svg"
import ShareFaq from "../assets/images/ShareFaq.svg"
import MessageFaq from "../assets/images/MessageFaq.svg" 
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'; 
import {  TouchableOpacity } from 'react-native'
 
import { ScaledStyleSheet } from './ScaledStyleSheet' 
const FaqDetails = () => {
 

  const faq = useLocalSearchParams(); // Extract the loan object from route.params   
  const [loading, setLoading] = useState(true); 

  const RateLike = () => {
    // Alert.alert("RateLike button pressed!");
  }; const ShareClicked = () => {
    // Alert.alert("ShareClicked button pressed!");
  }; const MessageClick = () => {
    // Alert.alert("MessageClick button pressed!");
  };
  
  const router = useRouter();
  const handleBackPress = () => {
    router.back();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.backRowStyle}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.TextTitle}>{faq.category}</Text>
        </View> */}
 
        <ScrollView style={styles.card}>

          <Text style={styles.title}>{faq.title}</Text> 
            <Text>{faq.describe}</Text> 
        </ScrollView>

        <View style={styles.EndCont}>
          <View style={styles.rowStyle}>
            <TouchableOpacity style={styles.LeftRight} onPress={MessageClick}>
              <View style={styles.miniButton}><MessageFaq style={styles.icon} width={50} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.miniButtonCentre} onPress={ShareClicked}>
              <View style={styles.miniButton}><ShareFaq style={styles.icon} width={50} /></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.RightRight} onPress={RateLike}>
              <View style={styles.miniButton}><RateLikeFaq style={styles.icon} width={50} /></View></TouchableOpacity></View>
        </View>
      </SafeAreaView>
    </>

  );
};
const styles = ScaledStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    // backgroundColor: 'red', // Фон для контента
  },
  backRowStyle: {
    flexDirection: "row",
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
  scrolledContainer: {
    display: "flex",
    flexGrow: 1,
  },
  card: {
    flex: 1, 
    display: "flex",
    overflow: "scroll", 
    marginBottom: 100,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    paddingBottom: 16,
  },
  icon: {
    marginLeft: "25%",
    marginRight: "",
    marginTop: "-10%",
    marginBottom: "",
  },
  EndCont: {
    position: "absolute",
    top: "87%",
},
  applyButtonCARD: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  
  rowStyle: {
    marginBottom: 5, // Adds some vertical spacing between rows
    flexDirection: "row",
  },

  miniButton: {
    resizeMode: "contain",
    width: "150%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,

    borderColor: "C0C0C0",
    borderWidth: 1,
  },
  miniButtonCentre: {
    margin: "3%",
    height: "70%",
    width: "20%",
  },
  RightRight: {
    margin: "3%",
    height: "70%",
    marginRight: "5%",
    marginLeft: "10%",
    width: "20%",
  },
  LeftRight: {
    margin: "3%",
    height: "70%",
    marginRight: "10%",
    marginLeft: "5%",
    width: "20%",
  },
  title: {
    fontSize: 15,
    marginVertical: 1,
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
})



export default FaqDetails
