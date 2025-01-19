import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from './services/firebaseConfig';
import { useRouter } from 'expo-router';
import { registerWithEmail } from './services/authUtils';
import LabeledTextInput, { TextInputType } from '@/Common/LabeledTextInput';
const styles = Platform.OS === 'android'
  ? require('../styles/styles.android').default
  : require('../styles/styles.android').default;

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [naming, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [IsConfirmPassword, setIsConfirmPassword] = useState('');
  const router = useRouter();

  const [error, setError] = useState("");

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
    if (!nickname || !email || !password || !IsConfirmPassword) {
      Alert.alert('Ошибка', 'Заполните все поля.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Ошибка', 'Введите действительный email.');
      return;
    }

    if (password !== IsConfirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен быть не менее 6 символов.');
      return;
    }


    try {
      const userCredentials = await registerWithEmail(email, password);

      // Check if the email is already registered
      const user = doc(db, `users/${email}`)
      // проверить есть ли юзер
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert('Ошибка', 'Пользователь с таким email уже существует.');

        return;
      }
      const isActive: Boolean = true
      // Save the new user to Firestore
      const newUser = {
        nickname,
        isActive// Ideally, hash the password before storing it
      };

      await setDoc(doc(db, `users/${email}`), newUser);
      Alert.alert('Успех', 'Вы успешно зарегистрировались!');
      router.push('/sign-in');

    } catch (err: any) {
      setError(err.message);
    }




  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={styles.containerSignUp}>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <LabeledTextInput value={nickname} onChangeText={setNickname} label='Nickname'  placeholder='Введите имя пользователя' />
      <LabeledTextInput value={email} onChangeText={setEmail} inputType={TextInputType.email} />
      <LabeledTextInput value={password} onChangeText={setPassword} inputType={TextInputType.password} />
      <LabeledTextInput value={IsConfirmPassword} onChangeText={setIsConfirmPassword} inputType={TextInputType.confirmPassword} />

      <TouchableOpacity style={styles.buttonSignIn} onPress={handleRegister}>
        <Text style={styles.buttonText}>Регистрация</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ alignSelf: "center", padding: 12 }} onPress={handleLogin}>
        <Text style={{ fontSize: 18, color: "#007bff" }}>Авторизация</Text>
      </TouchableOpacity>
    </View>
  );
};

// const styles = ScaledStyleSheet.create({
//   container: {
//     height: "100%",
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   buttonDown: {
//     width: '100%',
//     height: 50,
//     marginTop: "10%",
//     backgroundColor: '#007bff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#007bff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   error: { color: "red", marginBottom: 10 },
// });

export default SignUp;
