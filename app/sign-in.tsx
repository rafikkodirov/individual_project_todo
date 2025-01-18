import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { ScaledStyleSheet } from './ScaledStyleSheet';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getItems, getUser } from './services/firestore';
import { loginWithEmail, loginWithGoogle } from './services/authUtils';
import { useLoading } from '@/providers/LoadingProvider';
import { AsyncStore, SecureStore } from '@/stores/global.store';
import { AppUser, useAuth } from '@/providers/authProvider';
import { FSUserInfo, useDataContext } from '@/providers/DataProvider';

const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const { isLoading, setLoading } = useLoading();
  const user = useAuth()
  const router = useRouter();
  const {refreshRequest} = useDataContext()

  // const handleGoogleLogin = async () => {
  //   try {
  //     await loginWithGoogle();
  //   } catch (err: any) {
  //     setError(err.message);
  //   }
  // };

  useEffect(() => {
    // console.log(user, 'userSignIn User changed');
    setLoading(true);
    if (user) {
      const savedUser = SecureStore.get<AppUser>("USER");
      if (savedUser !== null) {
        setEmail(savedUser.email)
        // console.log(savedUser, 'userSignIn savedUser in signin');
        getUser(savedUser.email).then((userFromFb) => {
          // console.log(userFromFb, 'userSignIn userFromFb in signin');
          if (userFromFb) { 
            console.log(userFromFb, 'userSignIn userFromFb in signin push activeTask');
            router.push({
              pathname: '/(tabs)/activeTask',
              params: {
                user: userFromFb
              }
            });
          }
        })
      }
    }
    setLoading(false);
  }, [user])


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

      const userData = await loginWithEmail(email, password);
      // console.log(auth.currentUser, "Login successfully");
      SecureStore.save<AppUser>('USER', { email, password });
      const user = await getUser(email)
      const userData2: FSUserInfo = {
        id: email, // user.id,
        isActive: user.isActive,
        nickname: user.nickname, 
      }

      console.log("Signin..................Launched");
      await AsyncStore.save<FSUserInfo>('USER_DATA', userData2);
      refreshRequest();

      // const savedUser = await AsyncStore.get<FSUserInfo>("USER_DATA");
      // console.log(savedUser, "savedUser.......1234566");

      // console.log(user, "user");
      if (user) {
        if (user.isActive) {
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
