
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
  : require('../styles/styles.android').default; interface AddGroupScreenProps {
  closeModal: () => void;
}

const AddTaskS: React.FC<AddGroupScreenProps> = ({ closeModal }) => {
  
  const now = new Date().getTime(); // Текущее время 
  const oneDayInMs = 24 * 60 * 60 * 1000; // миллисекунд в од
  const nextDay = new Date(now + oneDayInMs)
  const [groupId, setGroupId] = useState('');
  const [performer, setPerformer] = useState<{ id: string, name: string } | null>(null);
  const [owner, setOwner] = useState('');
  const [groupName, setGroupName] = useState('');
  const [nickname, setnickname] = useState('');
  const [status, setStatus] = useState('');
  const [endTime, setEndTime] = useState(new Date());
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(nextDay);
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

  const onChangeEnd = (event: any, selectedDate?: Date) => {
    setShowEnd(false);
    if (selectedDate) setDateEnd(selectedDate);
  };
  // const showSearch = displayedUsers.length > 4
  const ITEM_HEIGHT = 50
  const showDatePickerEnd = () => {

    setShowEnd(true);
  };
  const handleGroupSelect = (id: string, name: string) => {
    setGroupId(id);
    setGroupName(name);
  };

  const handleUserSelect = (id: string, name: string) => {
    setPerformer({ id: id, name: name });
  };

  const formatDateToDDMMYYYY = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const addTaskFunc = async () => {
    if (!title || !description || !endTime || !groupName  ) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }
    const newTask = {
      endTime: dateEnd,
      groupId,
      status: TaskStatuses.in_progress,
      ownerId: userData.email,
      ownerName: userData.nickname,
      // performerId: performer.id,
      // performerName: performer.name,
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
              minimumDate={nextDay}
              onChange={onChangeEnd}
            />
          )}</View>
        <View style={{ marginTop: 10 }}>
          <Button title="Добавить" onPress={addTaskFunc} color="#007bff" />

        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddTaskS;
