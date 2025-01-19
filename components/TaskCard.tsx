import { Timestamp } from "firebase/firestore";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from '../styles/styles.android'

import dayjs from "dayjs"

interface TaskProps {
  task: any;
  onComplete: (task: any) => void;
}

const TaskCard: React.FC<TaskProps> = ({
  task,
  onComplete
}) => {
  const getTime = (fbsDate?: Timestamp) => {
    if (!fbsDate) return '***'
    return dayjs(fbsDate.toDate()).format("DD/MM/YYYY")
  }
  return (
    <View style={styles.cardContainer}>
      {/* Заголовок и даты */}
      <View style={styles.contentTask}>
        <ScrollView>
          <Text style={styles.title}>{task.description}</Text></ScrollView>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{getTime(task.startDate)} </Text>
          <Text style={styles.timeText}>{getTime(task.endDate)} </Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.buttonTask} onPress={onComplete}>
          <Text style={{ fontSize: 14, fontWeight: 'bold',
          }}>Завершить</Text>
        </TouchableOpacity>
        <Text style={styles.owner}>{task.owner}</Text>
        <Text style={styles.owner}>{task.groupName}</Text>
      </View>
    </View>
  );
};


export default TaskCard; 
