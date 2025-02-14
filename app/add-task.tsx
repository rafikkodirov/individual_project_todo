
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import GroupSelector from './GroupSelector';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router, useLocalSearchParams } from 'expo-router';
import { useDataContext } from '@/providers/DataProvider';
import { TaskStatuses } from '@/Common/TaskStatuses';
import UserSelector from './UserSelector';
import LabeledTextInput, { TextInputType } from '@/Common/LabeledTextInput';
import { Ionicons } from '@expo/vector-icons';
const styles = Platform.OS === 'android'
  ? require('../styles/styles.android').default
  : require('../styles/styles.android').default;
const AddTaskS: React.FC = () => {
  const [groupId, setGroupId] = useState('');
  const [performer, setPerformer] = useState<{ id: string, name: string } | null>(null);
  const [owner, setOwner] = useState('');
  const [groupName, setGroupName] = useState('');
  const [nickname, setnickname] = useState('');
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
  const [inputHeight, setInputHeight] = useState(40)
  const [isGroupSelectorVisible, setGroupSelectorVisible] = useState(false);
  const [isUserSelectorVisible, setisUserSelectorVisible] = useState(false);
  const params = useLocalSearchParams()
  const [time, setTime] = useState(new Date())
  const [showTimePicker, setShowTimePicker] = useState(false);

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
  
  const handleUserSelect = (selectedUser: {id: string, name: string}[]) => {
    setPerformer({ id:selectedUser[0].id, name: selectedUser[0].name });
  };

  const openTimePicker = () => { 
    setShowTimePicker(true); 
  }

  const onTimeChange = (event: any,selectedTime?: Date) => {
    if (selectedTime) {
      setTime(selectedTime);
    }
    setShowTimePicker(false);
  };
  const formatDateTime = () => {
    return `${date.toLocaleDateString()} ${time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  const formatDateToDDMMYYYY = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const addTaskFunc = async () => {
    if (!title || !description   || !endTime || !groupName || !performer) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }
    const newTask = {
      startTime: date,
      endTime: dateEnd,
      groupId,
      status: TaskStatuses.pending,
      ownerId: userData.email,
      ownerName: userData.nickname,
      performerId: performer.id,
      performerName: performer.name,
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
        <LabeledTextInput value={title} onChangeText={setTitle} inputType={TextInputType.title} />
        <LabeledTextInput value={description} onChangeText={setDescription} inputType={TextInputType.description} />

        <View style={{ padding: 6 }}>
          <View style={styles.rowStyle}>
            <Text style={styles.header}>
              Выбранная группа: {groupName || "Не выбрана"}
            </Text>
            <TouchableOpacity onPress={() => setGroupSelectorVisible(true)}>
              <Ionicons name="people" size={26} color="#007AFF" />
            </TouchableOpacity>
          </View>
          <GroupSelector visible={isGroupSelectorVisible} onClose={() => setGroupSelectorVisible(false)} onSelectGroup={handleGroupSelect} />
          <View style={styles.rowStyle}>

            <Text style={styles.header}>Пользователь : {performer?.name || 'Не выбрана'}</Text>
            <TouchableOpacity onPress={() => setisUserSelectorVisible(true)}>
              <Ionicons name="person" size={22} color="#007AFF" />
            </TouchableOpacity>
          </View>
          <UserSelector visible={isUserSelectorVisible} onClose={() => setisUserSelectorVisible(false)} onSelectUser={handleUserSelect} />
        </View>
        <View style={{ ...styles.rowStyle, padding: 6 }}>
          <Text style={styles.header}>
            Дедлайн дата: {dateEnd ? formatDateToDDMMYYYY(dateEnd) : "Не выбрано"}
          </Text>
          <TouchableOpacity onPress={showDatePickerEnd}>
            <Ionicons name="calendar" size={26} color="#007AFF" />
          </TouchableOpacity>
          {showEnd && Platform.OS === "android" && (
            <DateTimePicker
              value={dateEnd}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={onChangeEnd}
            />
          )}</View> 
        <View style={{ marginTop: 10 }}>
          <Button title="Добавить задачу" onPress={addTaskFunc} color="#007bff" />

        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddTaskS;
