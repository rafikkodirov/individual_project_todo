import { ScaledStyleSheet } from "@/Common/ScaledStyleSheet";
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

interface GroupsProps {
  groups: any;  // URL or image source 
  onDetailsPress: (groups: any) => void; 
}

const GroupCard: React.FC<GroupsProps> = ({
  groups, 
  onDetailsPress, 
}) => { 
  return (
    <View style={styles.cardContainer}>
      {/* Заголовок и даты */}
      <View style={styles.content}>
          <Text style={styles.title}>{groups.groupName}</Text> 
        <View style={styles.timeContainer}>
          <View
            style={[styles.circle, { backgroundColor: groups.color }]} // Используем динамический цвет
          />
        </View>
       
      </View>

      {/* Кнопка завершения и категория */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.detailsButton} onPress={onDetailsPress}>
          {/* (loan) */}
          <Text style={styles.detailsText}>Участники</Text>
        </TouchableOpacity>
        <View style={styles.title}>
        <Text>{groups.owner}</Text>
      </View>
      </View>
      
    </View>
  );
};

 
export default GroupCard; 
