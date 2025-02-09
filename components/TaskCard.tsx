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
  const formatDateTime = (dateString: string) => {
     if (!dateString) return '***'
    return dayjs(dateString).format('DD/MM/YYYY HH:mm');
  };
  console.log((task.startTime).toDate(),'dateTome')

  return (
    <View style={styles.cardContainer}>
      <View style={styles.contentTask}>
        <ScrollView>
          <Text style={styles.title}>{task.title}</Text></ScrollView>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{task.startTime ? formatDateTime(task.startTime.toDate()) : 'Не указано'}</Text>
          <Text style={styles.timeText}>{task.endTime ? formatDateTime(task.endTime.toDate()) : 'Не указано'}</Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.buttonTask} onPress={onComplete}>
          <Text style={{
            fontSize: 14, fontWeight: 'bold',
          }}>Завершить</Text>
        </TouchableOpacity> 
        <Text style={styles.owner}>{task.groupName}</Text>
      </View>
    </View>
  );
};


export default TaskCard; 
