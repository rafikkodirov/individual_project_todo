import { useDataContext } from "@/providers/DataProvider";
import React, { useEffect, useMemo, useState } from "react";
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
  const { selectedGroup, userData } = useDataContext();

  const isOwner = selectedGroup?.ownerId === user.key;

  const colorForUser = useMemo(() => {
    switch (true) {
 
      case isOwner:
        return 'gold';     // 🔵 владелец
      default:
        return 'black';    // ⚫ по умолчанию
    }
  }, [user.isSelected, isOwner]);



  return (
    <View style={{
      ...styles.card,
      margin: 2,  
    }}>
      <View style={[styles.content, { flexDirection: 'row', alignItems: 'center' }]}>
        <Text
          style={{
            ...styles.title,
            fontWeight:  '300',
            color: colorForUser,
          }}
        >
          {user.nickname}
        </Text>
        {isOwner && (
          <Text style={{ marginLeft: 6, fontSize: 13 }}>👑</Text>
        )}
      </View>

    </View>
  );
};
export default UserListCard; 
