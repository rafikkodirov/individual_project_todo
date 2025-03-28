import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Platform } from 'react-native'; 
const styles = Platform.OS === 'android' 
  ? require('../styles/styles.android').default 
  : require('../styles/styles.android').default; 

interface UsersProps {
  user: any;   
}

const UserListCard: React.FC<UsersProps> = ({
  user,  
}) => { 
 
  return (
    <View style={{...styles.card,
      margin:2,
      borderWidth: user.isSelected ? 0.5 : 0,
      borderColor: user.isSelected ? "#dd1c1c" : "#dd1c1c",
    }}> 
      <View style={styles.content}>
          <Text style={{...styles.title,
            fontWeight: user.isSelected ? "700" : "300",
            color: user.isSelected ? "#dd1c1c" : "black",
          }}>{user.nickname}</Text> 
      </View> 
    </View>
  );
};
export default UserListCard; 
