import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { ScaledStyleSheet } from './ScaledStyleSheet';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getItems, getUser } from './services/firestore';
import { loginWithEmail, loginWithGoogle } from './services/authUtils';
import { auth } from './services/firebaseConfig';
import { isLoading } from 'expo-font';
import { getData, storeData } from '@/hooks/storageUtils'; 
import { useLoading } from '@/providers/LoadingProvider';

const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState("");
  const { isLoading, setLoading } = useLoading();
  const router = useRouter();

  // const handleGoogleLogin = async () => {
  //   try {
  //     await loginWithGoogle();
  //   } catch (err: any) {
  //     setError(err.message);
  //   }
  // };

  useEffect(() => {
    getData("user").then((data) => {
      if (data) {
        const user = JSON.parse(data)
        setEmail(user.email)
        setPassword(user.password)
      }
    })
  }, []);


  // Login Handler
  const handleReg = () => {
    router.push({
      pathname: "/sign-up"
    })
  }

  const handleLogin = async () => {

    // console.log("handleLogin 1", loading);
    if (isLoading) return;

    setLoading(true);
    // console.log("handleLogin 2");

    if (!email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, введите email и пароль.');
      setLoading(false);
      return;
    }

    try {
      // console.log("handleLogin 3");

      const User = await loginWithEmail(email, password);
      // console.log(auth.currentUser, "Login successfully");

      const user = await getUser(email)
      storeData("userData", JSON.stringify({
        ...user,
        id: email
      }));

      console.log(user, "user");
      if (user) {
        if (user.isActive) {
          storeData("user", JSON.stringify({ email: email, password: password }))
          router.push({
            pathname: '/(tabs)/activeTask',
            params: {
              user: user
            }
          });
        } else {
          router.push({
            pathname: '/sign-up',

          });
        }
      }



    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }


  };

  return (
    <View style={styles.container}>
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

      {/* <Button title="Login with Google" onPress={handleGoogleLogin} /> */}

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
    marginTop: "4%",
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
  error: { color: "red", marginBottom: 10 },
});

export default AuthScreen; 
