import { Timestamp } from "firebase/firestore";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from '../styles/styles.android'

import dayjs from "dayjs"
import { Ionicons } from "@expo/vector-icons";

interface TaskProps {
  task: any;

}

const TaskCard: React.FC<TaskProps> = ({
  task,
}) => {
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '***'
    return dayjs(dateString).format('DD/MM/YYYY HH:mm');
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.rowStyle}>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.owner}>{task.title}</Text> 
        </View>
        <View style={styles.contentTask}>
          <View style={{ alignContent: "flex-end" }}> 
            <Text  >{task.endTime ? formatDateTime(task.endTime.toDate()) : 'Не указано'} </Text></View>

        </View>
      </View>
    </View>
  );
};


export default TaskCard; 
