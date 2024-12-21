import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';

interface GroupSelectorProps {
  groups: any[];
  visible: boolean;
  onClose: () => void;
  onSelectGroup: (id: string, name: string) => void;
}

const GroupSelector: React.FC<GroupSelectorProps> = ({ groups, visible, onClose, onSelectGroup }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGroups, setFilteredGroups] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = groups.filter(group => group.groupName.toLowerCase().includes(query.toLowerCase()));
    setFilteredGroups(filtered);
  };

  const displayedGroups = searchQuery.trim() ? filteredGroups : groups;
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          
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
          {/* <View style={styles.Button}> */}
          <Button title="Закрыть" onPress={onClose} />
          {/* </View> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    // alignItems: 'center',
  },
  Button: {
    width: '100%',
    marginTop:'5%',
    backgroundColor: '#fff',
    borderRadius: 10,
   
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '100%',
  },
  groupItem: {
    padding: 10,
    
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  groupText: {
    fontSize: 20,
    marginBottom:10,
  },
});

export default GroupSelector;
