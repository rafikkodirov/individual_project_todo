import { ScaledStyleSheet } from "@/app/ScaledStyleSheet";
import { Timestamp } from "firebase/firestore";
// import i18n from "@/i18n/i18n";
import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Platform } from 'react-native';
// import styles from '../styles_fin2/styles.android' 

import dayjs from "dayjs"
const styles = Platform.OS === 'android' 
  ? require('../styles_fin2/styles.android').default 
  : require('../styles_fin2/styles.android').default; 

interface UsersProps {
  users: any;  // URL or image source  
}

const UserListCard: React.FC<UsersProps> = ({
  users,  
}) => {
  // const getTime = (fbsDate?: Timestamp) =>{
  //   if(!fbsDate) return '***'
  //   return  dayjs(fbsDate.toDate()).format("DD/MM/YYYY HH:mm")
  // }
  return (
    <View style={styles.card}>
      {/* Заголовок и даты */}
      <View style={styles.content}>
          <Text style={styles.title}>{users.nickname}</Text> 
        <View style={styles.timeContainer}>
        <Text>{users.owner}</Text>
        </View>
       
      </View>

      {/* Кнопка завершения и категория */}
      
    </View>
  );
};

 
export default UserListCard; 
