import { ScaledStyleSheet } from "@/app/ScaledStyleSheet";
import { Timestamp } from "firebase/firestore";
// import i18n from "@/i18n/i18n";
import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Platform } from 'react-native';
// import styles from '../styles_fin2/styles.android' 

import dayjs from "dayjs"

interface GroupsProps {
  groups: any;  // URL or image source 
  // onDetailsPress: (task: any) => void;
  // onApplyPress: (task: any) => void;
}

const GroupCard: React.FC<GroupsProps> = ({
  groups, 
  // onDetailsPress,
  // onApplyPress,
}) => {
  // const getTime = (fbsDate?: Timestamp) =>{
  //   if(!fbsDate) return '***'
  //   return  dayjs(fbsDate.toDate()).format("DD/MM/YYYY HH:mm")
  // }
  return (
    <View style={styles.cardContainer}>
      {/* Заголовок и даты */}
      <View style={styles.content}>
          <Text style={styles.title}>{groups.title}</Text> 
        <View style={styles.timeContainer}>
          <View
            style={[styles.circle, { backgroundColor: groups.color }]} // Используем динамический цвет
          />
        </View>
      </View>

      {/* Кнопка завершения и категория */}
      
    </View>
  );
};

const styles = ScaledStyleSheet.create({
  cardContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    margin: 8,
    backgroundColor: '#fff',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  timeContainer: {
    flex: 1,                  // Контейнер занимает всю доступную область
    justifyContent: 'flex-start', // Выравнивание по верхнему краю
    alignItems: 'flex-start',    // Выравнивание по левому краю
    marginTop: 20,             // Опционально для отступа сверху
  },

  circle: {
    width: 25,                // Ширина круга
    height: 25,               // Высота круга
    borderRadius: 25,         // Полукруглый радиус (для создания круга)
    position: 'absolute',     // Абсолютное позиционирование
    top: -20,                    // Отступ от верхнего края
    right: 0,                 // Отступ от правого края
  },
  timeText: {
    fontSize: 12,
    color: '#555',
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  buttonR: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: "1%",
    width: "50%"
  },
  buttonL: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,

    marginRight: "1%",
    width: "50%"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  commentBubble: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    marginLeft: 8,
  },
  category: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default GroupCard; 
