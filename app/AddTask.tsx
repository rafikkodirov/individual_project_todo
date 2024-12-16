import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { addDoc, collection } from 'firebase/firestore'; 
import { db } from './services/firebaseConfig';

const AddTaskScreen: React.FC = () => {
  // Состояния для формы
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [category, setCategory] = useState('');

  // Функция добавления задачи в Firebase
  const addTask = async () => {
    if (!title || !startTime || !endTime || !category) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }

    const newTask = {
      title,
      startTime,
      endTime,
      category,
    };

    try {
      await addDoc(collection(db, 'tasks'), newTask);
      alert('Задача успешно добавлена!');
      // Очистка формы после добавления
      setTitle('');
      setStartTime('');
      setEndTime('');
      setCategory('');
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Добавить новую задачу</Text>

        {/* Поле ввода для Title */}
        <Text style={styles.label}>Название задачи:</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите название задачи"
          value={title}
          onChangeText={setTitle}
        />

        {/* Поле ввода для Start Time */}
        <Text style={styles.label}>Время начала:</Text>
        <TextInput
          style={styles.input}
          placeholder="01/01/2024 10:00"
          value={startTime}
          onChangeText={setStartTime}
        />

        {/* Поле ввода для End Time */}
        <Text style={styles.label}>Время окончания:</Text>
        <TextInput
          style={styles.input}
          placeholder="01/01/2024 11:00"
          value={endTime}
          onChangeText={setEndTime}
        />

        {/* Поле ввода для Category */}
        <Text style={styles.label}>Категория:</Text>
        <TextInput
          style={styles.input}
          placeholder="Школьные"
          value={category}
          onChangeText={setCategory}
        />

        {/* Кнопка для добавления задачи */}
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
