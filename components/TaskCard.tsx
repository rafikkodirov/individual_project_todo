import { Timestamp } from "firebase/firestore";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from '../styles/styles.android'

import dayjs from "dayjs"

interface TaskProps {
  task: any;

}

const TaskCard: React.FC<TaskProps> = ({
  task,
}) => {
  const borderStatusColor = useMemo(() => {
    switch (task.status) {
      case "pending":
        return "gray";
      case "in_progress":
        return "blue";
      case "in_review":
        return "orange";
      case "completed":
        return "green";
      case "expired":
        return "red";
      default:
        return "black";
    }
  }, [task.status]);
  console.log(task.status)

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '***'
    return dayjs(dateString).format('DD/MM/YYYY HH:mm');
  };

  return (
    <View
      style={[
        styles.cardContainer,
        {
          borderLeftWidth: 7, // Толщина линии
          borderLeftColor: borderStatusColor, // Цвет линии
        },
      ]}
    >
      <View style={styles.rowStyle}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={styles.owner}>{task.title}</Text>
          <Text style={styles.owner}>{task.ownerName}</Text>
        </View>
        <View style={styles.contentTask}>
          <View style={{ alignItems: "flex-end" }}>
            <Text  >{task.endTime ? formatDateTime(task.endTime.toDate()) : 'Не указано'} </Text>

            <Text >{task.performerName}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};


export default TaskCard; 
