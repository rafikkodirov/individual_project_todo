import { ScaledStyleSheet } from "@/Common/ScaledStyleSheet";
import { Timestamp } from "firebase/firestore";
// import i18n from "@/i18n/i18n";
import React from "react";
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
  return (
    <View style={styles.cardContainerGroup}>
      <View style={styles.rowStyle}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={styles.title}>{groups.groupName}</Text>
          <Text style={styles.subtitle}>{groups.owner}</Text>
        </View>
        <View style={{ alignItems: 'flex-end', }}>
          <View style={{ flexDirection: "row", backgroundColor: "black" }}>
            <TouchableOpacity style={styles.detailsButton} onPress={onDetailsPress}>
              <Text style={styles.detailsText}>Участники</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};


export default GroupCard; 
