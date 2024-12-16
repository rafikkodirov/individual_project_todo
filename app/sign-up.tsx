import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ScaledStyleSheet } from './ScaledStyleSheet';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './services/firebaseConfig';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleLogin = async () => {
    router.push({
      pathname: "/sign-in"
    })
  }
  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Ошибка', 'Заполните все поля.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Ошибка', 'Введите действительный email.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен быть не менее 6 символов.');
      return;
    }

    try {
      // Check if the email is already registered
      const q = query(collection(db, 'auth'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert('Ошибка', 'Пользователь с таким email уже существует.');
        return;
      }

      // Save the new user to Firestore
      const newUser = {
        email,
        password, // Ideally, hash the password before storing it
      };

      await addDoc(collection(db, 'auth'), newUser);
      Alert.alert('Успех', 'Вы успешно зарегистрировались!');
      router.push('/(tabs)/activeTask');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      Alert.alert('Ошибка', 'Не удалось завершить регистрацию. Попробуйте еще раз.');
    }
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>

      <TextInput
        style={styles.input}
        placeholder="Введите email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Введите пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!isPasswordVisible}

      />
      {/* <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
        <Ionicons
          name={isPasswordVisible ? 'eye-off' : 'eye'} // Switch icon
          size={24}
          color="#777"
        />
      </TouchableOpacity> */}
      <TextInput
        style={styles.input}
        placeholder="Подтвердите пароль"
        value={confirmPassword}
        onChangeText={setConfirmPassword}

        secureTextEntry={!isPasswordVisible}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Зарегистрироваться</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDown} onPress={handleLogin}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonDown: {
    width: '100%',
    height: 50,
    marginTop: "15%",
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUp;
