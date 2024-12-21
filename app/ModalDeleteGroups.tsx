import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { deleteElementFromFirebase } from './services/firestore'; // Убедитесь, что путь корректен

interface ModalSearchUsersProps {
  isVisible: boolean;
  onClose: () => void;
  groups: any[];
  filteredGroups: any[];
  searchQuery: string;
  onSearch: (query: string) => void;
  selectedGroup: string | null;
  onSelectGroup: (groupId: string) => void;
  docPath: string; // Добавляем путь к коллекции
  onDeleteSuccess: () => void; // Функция обратного вызова после удаления
}

const ModalDeleteGroups: React.FC<ModalSearchUsersProps> = ({
  isVisible,
  onClose,
  groups,
  filteredGroups,
  
  searchQuery,
  onSearch,
  
  selectedGroup,
  onSelectGroup,
  docPath,
  onDeleteSuccess,
}) => {
  // Удаление группы
  const handleDeleteGroup = async (group: any) => {
    Alert.alert(
      'Удалить группу',
      `Вы уверены, что хотите удалить группу "${group.groupName}"?`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteElementFromFirebase(docPath, group);
              Alert.alert('Успех', 'Группа успешно удалена');
              onDeleteSuccess(); // Обновляем список групп
            } catch (error) {
              console.error('Ошибка при удалении:', error);
              Alert.alert('Ошибка', 'Не удалось удалить группу');
            }
          },
        },
      ],
    );
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Поиск группы</Text>

          {/* Поле ввода для поиска */}
          <TextInput
            style={styles.input}
            placeholder="Введите название группы"
            value={searchQuery}
            onChangeText={onSearch}
          />

          {/* Список результатов поиска */}
          <FlatList
            data={filteredGroups}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View style={styles.groupItem}>
                <TouchableOpacity
                  style={[
                    styles.groupTextContainer,
                    selectedGroup === item.key && styles.selectedItem,
                  ]}
                  onPress={() => onSelectGroup(item.key)}
                >
                  <Text style={styles.groupText}>{item.groupName}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteGroup(item)}
                >
                  <Text style={styles.deleteButtonText}>Удалить</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              searchQuery !== '' ? (
                <Text style={styles.noResultsText}>Группы не найдены</Text>
              ) : null
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
    textAlign: 'center',
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
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  groupTextContainer: {
    flex: 1,
  },
  groupText: {
    fontSize: 16,
  },
  selectedItem: {
    backgroundColor: '#e6f7ff',
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noResultsText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ModalDeleteGroups;
