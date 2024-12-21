import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ScrollView, Platform, Switch, TouchableOpacity, FlatList } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from './services/firebaseConfig';  
import groups from './(tabs)/groups';
import { getItems } from './services/firestore';
// import {v4 as uuidv4} from 'uuid';
// Пример использования
const AddTaskScreen: React.FC = () => {
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
  useEffect(() => {
    const fetchGroups = async () => {
      const fetchedGroups: any[] = await getItems('groups');
      const fetchedUsers: any[] = await getItems('users');
      setGroups(fetchedGroups);
      setFilteredGroups(fetchedGroups);
      setUsers(fetchedUsers);
      setFilteredUsers(fetchedUsers);
    };
    fetchGroups();
  }, []);
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

  // Функция добавления задачи в Firebase
  const addTask = async () => {
    if (!description   || !startTime || !endTime  || !groupName || !owner ) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }
    const selectedGroupData = groups.find(group => group.id === groupId);
    if (!selectedGroupData) {
      
    console.log(setGroupId(groupId),"/ddddddddddddddddddddddddddd")
      alert('Выбранная группа не существует!');
      return;
    }
    const newTask = {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      groupId: selectedGroupData.id,
      groupName: selectedGroupData.title,
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
     

        {/* Поле для Title */}
        <Text style={styles.header}>Название задачи:</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите название задачи"
          value={description}
          onChangeText={setDescription}
        />
         <Text style={styles.header}>Выберите группу:</Text>
        <TextInput
          style={styles.input}
          placeholder="Поиск группы"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={filteredGroups}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.groupItem}
              onPress={() => selectGroup(item.key, item.groupName)}
            >
              <Text style={styles.groupText}>{item.groupName}</Text>
            </TouchableOpacity>
          )}
        />
         <Text style={styles.header}>Имя админа:</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите имя админа"
          value={owner}
          onChangeText={setOwner}
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

        <Button title={`Выбранная дата: ${date.toLocaleDateString()}`} onPress={() => { }} />


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
        <Button title={`Выбранная дата: ${dateEnd.toLocaleDateString()}`} onPress={() => { }} />
        {/* Поле для Category */} 
        

        {/* Кнопка для отправки */}
        <View style={styles.addTask}>
        <Button title="Добавить задачу" onPress={addTask} color="#007bff" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addTask:{
    marginTop:10,
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
