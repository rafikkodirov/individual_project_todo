// import React, { useEffect, useState } from 'react';
// import { Text, Button, SafeAreaView, ScrollView, Platform } from 'react-native';
// import { getItems } from './services/firestore';

// const styles = Platform.OS === 'android'
//   ? require('../styles/styles.android').default
//   : require('../styles/styles.android').default;
 
//   interface TaskScreenProps {
//     closeModal: () => void; 
//     task: any
//   } 
// const TaskDesc: React.FC<TaskScreenProps> = ({ closeModal,task }) => { 
//  console.log(task,'infoTask')
 
//   return (
//     <SafeAreaView style={styles.containerAddGroup}>
//       <ScrollView contentContainerStyle={{ padding: 16 }}>
//         <Text style={styles.header}> s</Text>
//         <Text>{task.description}</Text>
//          <Button title="Закрыть"  color="#007bff" />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
// export default TaskDesc;