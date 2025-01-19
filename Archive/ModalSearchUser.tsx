import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';

interface ModalSearchUsersProps {
  isVisible: boolean;
  onClose: () => void;
  users: any[];
  filteredUsers: any[];
  searchQuery: string;
  onSearch: (query: string) => void;
  selectedUser: string | null;
  onSelectUser: (userId: string) => void;
}
 
const ModalSearchUsers: React.FC<ModalSearchUsersProps> = ({
  isVisible,
  onClose,
  users,
  filteredUsers,
  searchQuery,
  onSearch,
  selectedUser,
  onSelectUser,
}) => {

  const displayedUsers = searchQuery.trim() ? filteredUsers : users;
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Поиск пользователя</Text>

          {/* Поле ввода для поиска */}
          <TextInput
            style={styles.input}
            placeholder="Введите имя пользователя"
            value={searchQuery}
            onChangeText={onSearch}
          />

          {/* Список результатов поиска */}
          <FlatList
            data={displayedUsers}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.userItem}
                onPress={() => onSelectUser(item.key)}
              >
                <View
                  style={[
                    styles.selectionCircle,
                    selectedUser === item.key && styles.selectedCircle,
                  ]}
                />
                <Text style={styles.userText}>{item.nickname}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              searchQuery !== ''
                ? <Text style={styles.noResultsText}>Пользователи не найдены</Text>
                : null
            }
          />

          {/* Кнопка закрытия */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'stretch',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:"center"
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  userItem: {
    flexDirection: 'row',
    marginBottom: 5,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    color: 'black',
  },
  userText: {
    fontSize: 16,
  },
  noResultsText: {
    fontSize: 16,
    color: '#777',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:"center"
  },
  selectionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007bff',
    marginRight: 10,
  },
  selectedCircle: {
    backgroundColor: '#007bff',
  },
});

export default ModalSearchUsers;
