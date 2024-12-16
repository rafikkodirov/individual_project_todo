import { ScaledStyleSheet } from "@/app/ScaledStyleSheet";
import { Timestamp } from "firebase/firestore";
// import i18n from "@/i18n/i18n";
import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Platform } from 'react-native'; 
// import styles from '../styles_fin2/styles.android' 

import dayjs from "dayjs"

interface TaskProps {
  task: any;  // URL or image source
  onComplete: (task: any) => void;
  // onDetailsPress: (task: any) => void;
  // onApplyPress: (task: any) => void;
}

const TaskCard: React.FC<TaskProps> = ({
  task,
  onComplete
  // onDetailsPress,
  // onApplyPress,
}) => {
  const getTime = (fbsDate?: Timestamp) =>{
    if(!fbsDate) return '***'
    return  dayjs(fbsDate.toDate()).format("DD/MM/YYYY HH:mm")
  }
  return (
    <View style={styles.cardContainer}>
      {/* Заголовок и даты */}
      <View style={styles.content}>
        <ScrollView>
        <Text style={styles.title}>{task.description}</Text></ScrollView>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{getTime(task.startDate)} </Text>
          <Text style={styles.timeText}>{getTime(task.endDate)} </Text>
        </View>
      </View>

      {/* Кнопка завершения и категория */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.button} onPress={onComplete}>
          <Text style={styles.buttonText}>Завершить</Text>
        </TouchableOpacity> 
        <Text style={styles.category}>{task.groupName}</Text>
      </View>
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
    alignItems: 'flex-end',
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
  button: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
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

// export default TaskCard;


//   // console.log(loan.name);
//   return (
//     <View style={styles.cardContainer}>
//       <View>
//         <Text> {task.description}</Text>
//       </View>
 
//     </View>
//   );
// };

// const styles = ScaledStyleSheet.create({
//   applyButtontask: {
//     backgroundColor: "#007AFF",
//     padding: 10,
//     borderRadius: 8,
//     marginLeft: "2%",
//     width: "50%",
//     alignItems: "center",
//   },
//   task: {
//     borderWidth: 0.5,
//     borderColor: "#000000",
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 14,
//     marginHorizontal: 16,
//     marginTop: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   topSection: {
//     flexDirection: "row",
//     alignItems: "stretch",
//   },
//   rowStyleContainer: {
//     flex: 1, // Ensures the rowStyleContainer takes up remaining space
//     alignItems: "stretch",
//   },
//   rowStyle: {
//     justifyContent: "space-between", // Distributes space between elements
//     marginBottom: 5, // Adds some vertical spacing between rows
//     flexDirection: "row",
//   },

// //   logo: {
// //     width: 45,
// //     height: 45,
// //     marginRight: 10,
// //   },
// //   title: {
// //     fontSize: 20,
// //     fontWeight: "bold",
// //   },
// //   subtitle: {
// //     color: "#231F20",
// //     fontSize: 12,
// //     textAlign: "left",
// //     flex: 1,
// //   }, 
// //   amount: {
// //     fontSize: 16,
// //     fontWeight: "bold",
// //     marginLeft: "auto",
// //   },
// //   ratingContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     marginLeft: "auto",
// //   },
// //   ratingText: {
// //     fontSize: 16,
// //     marginRight: 5,
// //   },
// //   reviews: {
// //     color: "#888",
// //     fontSize: 14,
// //   },
// //   buttonContainer: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     marginTop: 4,
// //   },
// //   detailsButton: {
// //     backgroundColor: "#F0F0F0",
// //     padding: 10,
// //     marginStart: "-1%",
// //     borderRadius: 5,
// //     width: "50%",
// //     alignItems: "center",
// //   },
// //   detailsText: {
// //     fontSize: 14,
// //     color: "#333",
// //   },
// //   applyButton: {
// //     backgroundColor: "#007AFF",
// //     padding: 10,
// //     marginLeft: "25%",
// //     borderRadius: 5,
// //     width: "48%",
// //     alignItems: "center",
// //   },
// //   applyText: {
// //     fontSize: 14,
// //     color: "#fff",
// //   },
// // });
// });

export default TaskCard; 
