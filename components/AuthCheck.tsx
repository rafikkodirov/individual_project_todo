import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import auth from '@react-native-firebase/auth'; // Или другой способ работы с авторизацией

const AuthCheck: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = auth().currentUser;

      if (currentUser) {
        // Если пользователь авторизован, отправляем его на главную
        router.replace('/(tabs)/activeTask');
      } else {
        // Если пользователь не авторизован, отправляем на экран авторизации
        router.replace('/sign-in');
      }

      setLoading(false); // Отключаем индикатор загрузки
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return null;
};

export default AuthCheck;
