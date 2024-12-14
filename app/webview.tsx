import { Button, GestureResponderEvent, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { ScaledStyleSheet } from './ScaledStyleSheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

interface LoanCardProps {
  element: any,
 }

 const Index: React.FC<LoanCardProps> = () => {
  const router = useRouter();
  const params = useLocalSearchParams(); // Fetch parameters passed via router
  
  const url = params?.site || 'https://expo.dev'; // Use a fallback if `url` is missing
  const name = params?.name || 'https://expo.dev'; // Use a fallback if `url` is missing

  
  // const handlePress = async () => {
  //   router.back()
  // };
  return (
    <>
      <WebView
        style={styles.container}
        source={{ uri: url.toString() }}  // ''
      />
    </>

  );

}

const styles = ScaledStyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },

})
export default Index
