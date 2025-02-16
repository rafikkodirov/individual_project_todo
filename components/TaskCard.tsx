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
      case "returned":
        return "#08158a";
      case "in_progress":
        return "#3db6db";
      case "in_review":
        return "orange";
      case "completed":
        return "#1ddb3f";
      case "declined":
        return "#d11111";
      case "expired":
        return "#434b4e";
      default:
        return "black";
    }
  }, [task.status]);

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
          <Text style={{fontSize:14,fontWeight: '500',}}>{task.title}</Text>
          <Text style={{paddingTop:5,fontSize:12,fontWeight: '400',}}>{task.ownerName}</Text>
        </View>
        <View style={styles.contentTask}>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{fontSize:14,fontWeight: '500',}}  >{task.endTime ? formatDateTime(task.endTime.toDate()) : 'Не указано'} </Text>

            <Text  style={{paddingTop:5,fontSize:12,fontWeight: '300',}} >{task.performerName}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};


export default TaskCard; 
