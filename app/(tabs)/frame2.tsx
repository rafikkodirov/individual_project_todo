import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import DateTimePicker from '@react-native-community/datetimepicker';
const AddTaskScreen: React.FC = () => {
  // Состояния для формы
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [category, setCategory] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

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
    setShow(true);
  };
  // Функция добавления задачи в Firebase
  const addTask = async () => {
    if (!title || !startTime || !endTime || !category) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }

    const newTask = {
      title,
      startTime: startTime.toISOString(), // Сохраняем в формате ISO строки
      endTime: endTime.toISOString(),
      category,
    };

    try {
      await addDoc(collection(db, 'tasks'), newTask);
      alert('Задача успешно добавлена!');
      setTitle('');
      setStartTime(new Date());
      setEndTime(new Date());
      setCategory('');
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Добавить новую задачу</Text>

        {/* Поле для Title */}
        <Text style={styles.label}>Название задачи:</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите название задачи"
          value={title}
          onChangeText={setTitle}
        />

        {/* DateTimePicker для StartTime */}
        <Text style={styles.label}>Время начала:</Text>
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
        <Text style={styles.label}>Время окончания:</Text>
        <Button title="Выбрать дату" onPress={showDatePickerEnd} />

        {show && Platform.OS === 'android' && (
          <DateTimePicker
            value={dateEnd}
            mode="date"
            display="default"
            onChange={onChangeEnd}
          />
        )}
        <Button title={`Выбранная дата: ${dateEnd.toLocaleDateString()}`} onPress={() => { }} />
        {/* Поле для Category */}
        <Text style={styles.label}>Категория:</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите категорию"
          value={category}
          onChangeText={setCategory}
        />

        {/* Кнопка для отправки */}
        <Button title="Добавить задачу" onPress={addTask} color="#007bff" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
});

export default AddTaskScreen;
