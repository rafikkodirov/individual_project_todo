import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getUser } from './services/firestore';
import { useLoading } from '@/providers/LoadingProvider';
import { AsyncStore, SecureStore } from '@/stores/global.store';
import { AppUser, useAuth } from '@/providers/authProvider';
import { FSUserInfo, useDataContext } from '@/providers/DataProvider';
import LabeledTextInput, { TextInputType } from '@/Common/LabeledTextInput';
const styles = Platform.OS === 'android'
  ? require('../styles/styles.android').default
  : require('../styles/styles.android').default;

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const { isLoading, setLoading } = useLoading();
  const user = useAuth()
  const router = useRouter();
  const { refreshRequest } = useDataContext()
  useEffect(() => {
    setLoading(true);
    if (user) {
      const savedUser = SecureStore.get<AppUser>("USER");
      if (savedUser !== null) {
        setEmail(savedUser.email)
        getUser(savedUser.email).then((userFromFb) => {
          if (userFromFb) {
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

  const handleReg = () => {
    router.push({
      pathname: "/sign-up"
    })
  }

  const handleLogin = async () => {
    if (isLoading) return;
    setLoading(true);
    if (!email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, введите email и пароль.');
      setLoading(false);
      return;
    }

    try {
      SecureStore.save<AppUser>('USER', { email, password });
      const user = await getUser(email)
      const userData2: FSUserInfo = {
        id: email,
        isActive: user.isActive,
        nickname: user.nickname,
      }
      await AsyncStore.save<FSUserInfo>('USER_DATA', userData2);
      refreshRequest();
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
    <View style={styles.containerSignIn}>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <LabeledTextInput value={email} onChangeText={setEmail} inputType={TextInputType.email} />
      <LabeledTextInput value={password} onChangeText={setPassword} inputType={TextInputType.password} />

      <TouchableOpacity style={styles.buttonSignIn} onPress={handleLogin}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ alignSelf: "center", padding: 12 }} onPress={handleReg}>
        <Text style={{ fontSize: 18, color: "#007bff" }}>Регистрация</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SignIn; 
