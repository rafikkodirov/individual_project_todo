import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Button, Platform, TextInput } from 'react-native';

interface GroupSelectorProps {
  groups: any[];
  visible: boolean;
  onClose: () => void;
  onSelectGroup: (id: string, name: string) => void;
}
const styles = Platform.OS === 'android'
  ? require('../styles/styles.android').default
  : require('../styles/styles.android').default;
const GroupSelector: React.FC<GroupSelectorProps> = ({ groups, visible, onClose, onSelectGroup }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGroups, setFilteredGroups] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = groups.filter(group => group.groupName.toLowerCase().includes(query.toLowerCase()));
    setFilteredGroups(filtered);
  };
  const showSearch = groups.length > 7
const ITEM_HEIGHT = 50
  const displayedGroups = searchQuery.trim() ? filteredGroups : groups;
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        {showSearch && (
            <TextInput
              style={styles.searchInput}
              placeholder="Поиск группы..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          )}
        <View style={{ maxHeight: ITEM_HEIGHT * 5 }}>
          
          <FlatList
            data={displayedGroups}
            keyExtractor={item => item.key}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.groupItem}
                onPress={() => {
                  onSelectGroup(item.key, item.groupName);
                  onClose();
                }}
              >
                <Text style={styles.groupText}>{item.groupName}</Text>
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


export default GroupSelector;
