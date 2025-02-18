import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Platform } from 'react-native'; 
const styles = Platform.OS === 'android' 
  ? require('../styles/styles.android').default 
  : require('../styles/styles.android').default; 

interface UsersProps {
  user: any;  // URL or image source  
}

const UserListCard: React.FC<UsersProps> = ({
  user,  
}) => { 
 
  return (
    <View style={{...styles.card,
      backgroundColor: user.isSelected ? "#e0e0e0" : "white",
    }}> 
      <View style={styles.content}>
          <Text style={{...styles.title,
            fontWeight: user.isSelected ? "700" : "300",
            color: user.isSelected ? "#007bff" : "gray",
          }}>{user.nickname}</Text> 
      </View> 
    </View>
  );
};
export default UserListCard; 
