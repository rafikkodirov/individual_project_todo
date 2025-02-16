import { ScaledStyleSheet } from "@/Common/ScaledStyleSheet";
import { Timestamp } from "firebase/firestore";
// import i18n from "@/i18n/i18n";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Platform } from 'react-native';
// import styles from '../styles_fin2/styles.android' 

import dayjs from "dayjs"
const styles = Platform.OS === 'android'
  ? require('../styles/styles.android').default
  : require('../styles/styles.android').default;

interface GroupsProps {
  groups: any;  // URL or image source 
  onDetailsPress: (groups: any) => void;
}

const GroupCard: React.FC<GroupsProps> = ({
  groups,
  onDetailsPress,
}) => {

  const [color, setColor] = useState(''); // Состояние для выбранного цвета
  useEffect(() => {
    setColor(groups.color)
  }, [groups.color])
  return (
    <View
      style={[
        styles.cardContainer,
        {
          padding: 14,
          borderLeftWidth: 7, // Толщина линии
          borderLeftColor: color, // Цвет линии
          borderColor: color,
          borderWidth: 1
        },
      ]}
    >
      <View style={styles.rowStyle}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={{ fontSize: 14, fontWeight: '500', }}>{groups.groupName}</Text>
          <Text style={{ fontSize: 12, fontWeight: '400', paddingTop: 3 }}>{groups.owner}</Text>
        </View>
        <View style={{ alignItems: 'flex-end', }}>
          <View style={{ flexDirection: "row", borderWidth: 0.5, borderColor: color || 'black', backgroundColor: color || 'black' }}>
            <TouchableOpacity style={{
              ...styles.detailsButton
            }} onPress={onDetailsPress}>
              <Text style={styles.detailsText}>Участники</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};


export default GroupCard; 
