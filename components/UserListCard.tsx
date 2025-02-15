import React from "react";
import { View, Text } from "react-native";
import { Platform } from 'react-native'; 
const styles = Platform.OS === 'android' 
  ? require('../styles/styles.android').default 
  : require('../styles/styles.android').default; 

interface UsersProps {
  users: any;  // URL or image source  
}

const UserListCard: React.FC<UsersProps> = ({
  users,  
}) => { 
  return (
    <View style={styles.card}> 
      <View style={styles.content}>
          <Text style={styles.title}>{users.nickname}</Text> 
          
        <View style={styles.timeContainer}>
        </View>
      </View> 
    </View>
  );
};
export default UserListCard; 
