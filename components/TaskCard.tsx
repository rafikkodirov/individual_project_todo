import { Timestamp } from "firebase/firestore";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from '../styles/styles.android'

import dayjs from "dayjs"
import { Ionicons } from "@expo/vector-icons";

interface TaskProps {
  task: any;
  onComplete: (task: any) => void;

  onInfo: (task: any) => void;
}

const TaskCard: React.FC<TaskProps> = ({
  task,
  onComplete,
  onInfo
}) => {
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '***'
    return dayjs(dateString).format('DD/MM/YYYY HH:mm');
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.contentTask}>
        <ScrollView>
          <Text style={styles.title}>{task.title}</Text></ScrollView>
        <View style={styles.rowStyle}>

          <View style={styles.circle}> </View>
          
          <TouchableOpacity onPress={() => onComplete(task)}>

            <Ionicons name="checkmark" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onInfo(task)}>

            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onInfo(task)}>

            <Ionicons name="help" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


export default TaskCard; 
