import { useDataContext } from '@/providers/DataProvider';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Button, Platform, TextInput } from 'react-native';

interface UserSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelectUser: (id: string, name: string) => void;
}
const styles = Platform.OS === 'android'
  ? require('../../../styles/styles.android').default
  : require('../../../styles/styles.android').default;
const UserSelector: React.FC<UserSelectorProps> = ({ visible, onClose, onSelectUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGroups, setFilteredGroups] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  
  const { getUsersByGroupId,selectedGroupId } = useDataContext(); 
   
 useEffect(() => {
  // Use a fallback value if selectedGroupId is not defined
  const groupId = selectedGroupId || 'Нету';

  const fetchUsers = async () => {
    try {
      const data = await getUsersByGroupId(groupId);
      setUsers(data);
    } catch (error) {
      console.error("Ошибка получения пользователей по группе:", error);
    }
  };

  fetchUsers();
}, [selectedGroupId]); // Depend on selectedGroupId so that effect re-runs when it changes



  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = users.filter(users => users.nickname.toLowerCase().includes(query.toLowerCase()));
    setFilteredGroups(filtered);
  };
  const showSearch = users.length > 4
  const ITEM_HEIGHT = 50
  const displayedUsers = searchQuery.trim() ? filteredGroups : users;
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {showSearch && (
            <TextInput
              style={styles.searchInput}
              placeholder="Поиск пользователя..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          )}
          <View style={{ maxHeight: ITEM_HEIGHT * 5 }}>

            <FlatList
              data={displayedUsers}
              keyExtractor={item => item.key}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{...styles.groupItem,marginBottom:10}}
                  onPress={() => {
                    onSelectUser(item.key,item.nickname);
                    onClose();
                  }}
                >
                  <Text style={styles.groupText}>{item.nickname}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Закрыть" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};


export default UserSelector;
