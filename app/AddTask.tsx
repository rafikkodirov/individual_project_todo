import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ScrollView, Platform, Switch, TouchableOpacity, FlatList } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from './services/firebaseConfig';
import groups from './(tabs)/groups';
import { getItems } from './services/firestore';
import GroupSelector from './GroupSelector';
import { getData } from '@/hooks/storageUtils';
// import {v4 as uuidv4} from 'uuid';
// Пример использования
interface AddTaskScreenProps {
  userId: string; // Идентификатор текущего пользователя
}
const AddTaskScreen: React.FC<AddTaskScreenProps> = ({userId}) => {
  // Состояния для формы 
  const [groupId, setGroupId] = useState('');
  const [owner, setOwner] = useState('');
  const [groupName, setGroupName] = useState('');
  // const [isPending, setIsPending] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [description, setDescription] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());

  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState<any[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const [showEnd, setShowEnd] = useState(false); 
  const [nickname, setNickname] = useState('');
  const [isGroupSelectorVisible, setGroupSelectorVisible] = useState(false);

  const [userData, setUserData] = useState<any>(null);  
  useEffect(() => {
    const fetchUserData = async () => {
      const userDataStr = await getData("userData");
      const parsedUserData = JSON.parse(userDataStr);
      setUserData(parsedUserData);
    };  
    fetchUserData();
  }, []);   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers: any[] = await getItems('users');
        const fetchedGroups: any[] = await getItems('groups');
        setGroups(fetchedGroups);
        setFilteredGroups(fetchedGroups);
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      
      
        // Найти nickname текущего пользователя
        const currentUser = fetchedUsers.find(user => user.id === userId);
        if (currentUser) {
          setNickname(currentUser.nickname || '');
        } else {
          console.warn('Пользователь не найден');
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };
 
    fetchData();
  }, [userId]);
  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false); // Закрыть пикер после выбора
    if (selectedDate) setDate(selectedDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };
  const onChangeEnd = (event: any, selectedDate?: Date) => {
    setShowEnd(false); // Закрыть пикер после выбора
    if (selectedDate) setDateEnd(selectedDate);
  };

  const showDatePickerEnd = () => {
    setShowEnd(true);
  };
  const selectGroup = (id: string, name: string) => {
    setGroupId(id);
    setGroupName(name);
    setSearchQuery(name);
  };
  const handleGroupSelect = (id: string, name: string) => {
    setGroupId(id);
    setGroupName(name);
  };
  // Функция добавления задачи в Firebase
  const addTask = async () => {
    if (!description || !startTime || !endTime || !groupName  ) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }

    const newTask = {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      groupId,
      groupName,
      ownerId: userData.id,
      ownerName: nickname,
      description,
    };

    try {
      await addDoc(collection(db, 'tasks'), newTask);
      alert('Задача успешно добавлена!');
      // setTitle('');
      setGroupId('');
      setGroupName('');
      setOwner('');
      // setIsPending(false);
      setStartTime(new Date());
      setEndTime(new Date());
      setDescription('');
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>


        {/* Поле для Title */}
        <Text style={styles.header}>Название задачи:</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите название задачи"
          value={description}
          onChangeText={setDescription}
        />
       <Text style={styles.header}>Выбранная группа: {groupName || 'Не выбрана'}</Text>
        <Button title="Выбрать группу" onPress={() => setGroupSelectorVisible(true)} />

        <GroupSelector
          groups={groups}
          visible={isGroupSelectorVisible}
          onClose={() => setGroupSelectorVisible(false)}
          onSelectGroup={handleGroupSelect}
        />
       


        {/* DateTimePicker для StartTime */}
        <Text style={styles.header}>Время начала:</Text>
        <Button title="Выбрать дату" onPress={showDatePicker} />

        {show && Platform.OS === 'android' && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        <Text style={styles.smallThanHeader}> {`Выбранная дата: ${date.toLocaleDateString()}`} </Text>


        {/* DateTimePicker для EndTime */}
        <Text style={styles.header}>Время окончания:</Text>
        <Button title="Выбрать дату" onPress={showDatePickerEnd} />

        {showEnd && Platform.OS === 'android' && (
          <DateTimePicker
            value={dateEnd}
            mode="date"
            display="default"
            onChange={onChangeEnd}
          />
        )}
        <Text style={styles.smallThanHeader}> {`Выбранная дата: ${dateEnd.toLocaleDateString()}`} </Text>
        {/* Поле для Category */}


        {/* Кнопка для отправки */}
        <View style={styles.addTask}>
          <Button title="Добавить задачу" onPress={addTask} color="#007bff" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addTask: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    padding: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    
  },
  smallThanHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"#ffe033",
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  groupItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  groupText: {
    fontSize: 16,
  },
});

export default AddTaskScreen;
