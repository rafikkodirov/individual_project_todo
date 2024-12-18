import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { ScaledStyleSheet } from './ScaledStyleSheet';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getItems } from './services/firestore';
import { loginWithEmail, loginWithGoogle } from './services/authUtils';

const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState("");

  const router = useRouter();
  
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message);
    }
  };
  
  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers: any[] = await getItems('auth');
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        Alert.alert('Ошибка', 'Не удалось загрузить данные авторизации.');
      }
    };

    fetchUsers();
  }, []);

  // Login Handler
  const handleReg = () => {
    router.push({
      pathname:"/sign-up"
    })
  }
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, введите email и пароль.');
      return;
    }

    try {
      await loginWithEmail(email, password);
    } catch (err: any) {
      setError(err.message);      
    }



    // const user = users.find(
    //   (user) => user.email === email && user.password === password
    // );

    // if (user) { 
    //   router.push({
    //     pathname: '/(tabs)/activeTask',
    //   });
    // } else {
    //   Alert.alert('Ошибка', 'Неверный email или пароль.');
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Авторизация</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
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

      <Button title="Login with Google" onPress={handleGoogleLogin} />
      
      <TouchableOpacity style={styles.buttonDown} onPress={handleReg}>
        <Text style={styles.buttonText}>Зарегистрироваться</Text>
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
  buttonDown: {
    width: '100%',
    height: 50,
    marginTop:"15%",
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
