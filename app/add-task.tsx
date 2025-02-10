 
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { Timestamp } from 'firebase/firestore'; 
import { getItems } from './services/firestore';
import GroupSelector from './GroupSelector';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router, useLocalSearchParams } from 'expo-router';
import { useDataContext } from '@/providers/DataProvider';
import { TaskStatuses } from '@/Common/TaskStatuses';
const styles = Platform.OS === 'android'
  ? require('../styles/styles.android').default
  : require('../styles/styles.android').default; 
const AddTaskS: React.FC= () => { 
  const [groupId, setGroupId] = useState('');
  const [owner, setOwner] = useState('');
  const [groupName, setGroupName] = useState(''); 
  const [status, setStatus] = useState(''); 
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [description, setDescription] = useState(''); 
  const [title, setTitle] = useState(''); 
  const [date, setDate] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date()); 
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState<any[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<any[]>([]); 
  const [show, setShow] = useState(false);
  const [showEnd, setShowEnd] = useState(false); 
  const [inputHeight,setInputHeight] = useState(40)
  const [isGroupSelectorVisible, setGroupSelectorVisible] = useState(false);
  const params = useLocalSearchParams()
  useEffect(() => {
    if (params.groupId && params.groupName) {
      const _groupName = Array.isArray(params.groupName) ? params.groupName[0] : params.groupName;
      const _groupId = Array.isArray(params.groupId) ? params.groupId[0] : params.groupId;
      setGroupId(_groupId);
      setGroupName(_groupName);
      setSearchQuery(_groupName);
    }
  }, [params.groupId, groups]);
  const { addTask, userData } = useDataContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedGroups: any[] = await getItems('groups');
        setGroups(fetchedGroups);
        setFilteredGroups(fetchedGroups); 
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    fetchData();
  }, []);
  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false); 
    if (selectedDate) setDate(selectedDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };
  const onChangeEnd = (event: any, selectedDate?: Date) => {
    setShowEnd(false); 
    if (selectedDate) setDateEnd(selectedDate);
  };
  const showDatePickerEnd = () => {
    setShowEnd(true);
  }; 
  const handleGroupSelect = (id: string, name: string) => {
    setGroupId(id);
    setGroupName(name);
  };
  const formatDateToDDMMYYYY = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');  
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }; 
  const addTaskFunc = async () => { 
    if (!title || !description || !startTime || !endTime || !groupName) {
      alert('Пожалуйста, заполните все поля!');
      return;
    } 
    const newTask = {
      startTime: date,
      endTime: dateEnd,
      // startDate: Timestamp.fromDate(startTime),
      // endDate: Timestamp.fromDate(endTime),
      groupId,
      status: TaskStatuses.pending, 
      ownerId: userData.email,
      ownerName: userData.nickname,
      groupName,
      description,
      title,
    };

    try {
      await addTask(newTask);
      router.back() 
      setGroupId('');
      setGroupName('');
      setOwner('');  
      setDescription('');
      setTitle('');
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <View style={{ padding: 16 }}>
      <Text style={styles.header}>Название задачи</Text>
        <TextInput
          style={{ ...styles.input, height: 40, }}
          placeholder="Введите название задачи"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.header}>Описание задачи</Text>
        <TextInput
          style={{ ...styles.inputDescription, }}
          placeholder="Введите описание"
          value={description}
          multiline={true}  // Многострочный ввод
          numberOfLines={5} 
          onChangeText={setDescription}
        />
        <View style={{ padding: 6 }}>
        <Text style={styles.header}>Выбранная группа: {groupName || 'Не выбрана'}</Text>
        <Button title="Выбрать группу" onPress={() => setGroupSelectorVisible(true)} />

        <GroupSelector groups={groups} visible={isGroupSelectorVisible} onClose={() => setGroupSelectorVisible(false)} onSelectGroup={handleGroupSelect} />
        </View>
        <View style={{ padding: 6 }}>
          <Text style={styles.header}>Время начала: {date ? formatDateToDDMMYYYY(date) : 'Не выбрано'}</Text>
          <Button title="Выбрать дату" onPress={showDatePicker} />
          {show && Platform.OS === 'android' && (
            <DateTimePicker value={date} mode="date" display="default" minimumDate={new Date()} onChange={onChange}/>
          )}
        </View>

        <View style={{ padding: 6 }}>
          <Text style={styles.header}>Время начала: {dateEnd ? formatDateToDDMMYYYY(dateEnd) : 'Не выбрано'}</Text>
          <Button title="Выбрать дату" onPress={showDatePickerEnd} />
          {showEnd && Platform.OS === 'android' && (
            <DateTimePicker value={dateEnd} mode="date" display="default" minimumDate={date|| new Date()} onChange={onChangeEnd}/>
          )}
        </View>

        <View style={{ marginTop: 10 }}>
          <Button title="Добавить задачу" onPress={addTaskFunc} color="#007bff" />

        </View>
       </View>
     </SafeAreaView>
  );
};

export default AddTaskS;
