{/* <Text style={styles.title}>Авторизация</Text>

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
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDown} onPress={handleReg}>
        <Text style={styles.buttonText}>Зарегистрироваться</Text>
      </TouchableOpacity>*/}
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScaledStyleSheet } from '../ScaledStyleSheet';
import { getItems } from '../services/firestore';
import { auth } from '../services/firebaseConfig';
import { logout } from '../services/authUtils';

const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  // const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers: any[] = await getItems('Users');
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        Alert.alert('Ошибка', 'Не удалось загрузить данные авторизации.');
      }
    };

    fetchUsers();
  }, []);
  // const user = users.find(
  //   (user) => user.email === email    
  // );
  // && user.isActive === true
  // const handleLogin = () => {
  //   if (!email || !password) {
  //     Alert.alert('Ошибка', 'Пожалуйста, введите email и пароль.');
  //     return;
  //   }

  //   const user = users.find(
  //     (user) => user.email === email && user.password === password && user.isActive === true
  //   );

  //   if (user) { 
  //     router.push({
  //       pathname: '/(tabs)/activeTask',
  //     });
  //   } else {
  //     Alert.alert('Ошибка', 'Неверный email или пароль.');
  //   }
  // };
  const handleLog = async() => {
    // router.push({
    //   pathname:"/sign-in"
    // })
    await logout()
    console.log("logout");
    
  }
  return (
    <View style={styles.container}>

      <View>
      <Text style={styles.title}>Имя Пользователя</Text>
       <Text style={styles.applyTextFirst}>111111111111111111</Text>
       {/* {nickname} */}
       </View>
       <View>
         
      <Text style={styles.title}>Имя</Text>
       <Text style={styles.applyTextSecond}>111111111111111111</Text>
        {/* {naming} */}
       </View>
       <View>
       {/* <Text style={styles.applyTextFirst}>111111111111111</Text> */}
       </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLog} >
          <Text style={styles.applyText}>Выйти из аккаунта</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    // marginBottom: 20,
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

  buttonContainer: {
    flexGrow: 1,
    width:"100%",
    // backgroundColor: 'green', // Фон для контента
    justifyContent: 'flex-end', // Align items to the bottom of the container 
    marginBottom: "30%",
  },button: {
    marginHorizontal: 14, 
    paddingVertical: 10,
    backgroundColor: '#007BFF', // Цвет фона кнопки
    textAlign: "center",
    alignItems: 'center', // Центрирование по горизонтали
    borderRadius: 10,
    color: 'white',
  },
  applyText: {
    fontSize: 20,
    color: "#fff",
    
    textAlign:"center",
  },
  applyTextFirst: {
    fontSize: 30,
    marginTop:"4%",
    marginBottom:"40%",
    color: "black",
    
    textAlign:"center",
     
  },
  applyTextSecond: {
    fontSize: 30,
    marginTop:"4%",
    color: "black",
    justifyContent:"center",
    textAlign:"center",
     
  },
  center:{
    
    justifyContent:"center",
    textAlign:"center",
  },
  // button: {
  //   width: '100%',
  //   height: 50,
  //   backgroundColor: '#007bff',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 5,
  // },
  buttonDown: {
    width: '100%',
    height: 50,
    marginTop: "15%",
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

export default AuthScreen;
