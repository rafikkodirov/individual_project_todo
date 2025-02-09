import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { DataProvider } from '@/providers/DataProvider';
import { LoadingProvider } from '@/providers/LoadingProvider';
import { AuthProvider } from '@/providers/authProvider';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';
import AddGroupScreen from './AddGroups';
import { ScaledStyleSheet } from '@/Common/ScaledStyleSheet';
SplashScreen.preventAutoHideAsync();
type RouteParams = {
  name: string;
};
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const router = useRouter();
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const handleTasks = () => {
    router.push({
      pathname: '/AddTask',
    });
  };

  return (
    <AuthProvider>
      <LoadingProvider>
        <DataProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="UserList" options={{ headerShown: true, title: "Пользователи" }} />
            <Stack.Screen name="sign-in" options={{ headerShown: true, title: "Авторизация", headerBackVisible: false, headerTitleAlign: 'center' }} />
            <Stack.Screen
              name="GroupDetailsPage"
              options={({ route }) => ({
                headerShown: true,
                title: (route.params as RouteParams)?.name || 'Задания группы', // Заголовок
                headerRight: () => (
                  <TouchableOpacity
                    style={{backgroundColor: 'red', width: 40, height: 40}}
                    onPress={handleTasks}>
                    <Ionicons name="add" size={24} />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name="AddTask" options={{ headerShown: true, title: "Добавление задачи", headerBackTitle: "Назад" }} />
            <Stack.Screen name="AddGroups" options={{ headerShown: true, title: "Добавление группы", headerBackTitle: "Назад" }} />
            <Stack.Screen name="sign-up" options={{ headerShown: true, title: "Регистрация", headerBackVisible: false, headerTitleAlign: 'center' }} />
          </Stack>
        </DataProvider>
      </LoadingProvider>
    </AuthProvider>
  );
}

const styles = ScaledStyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 12,
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  button: {
    marginLeft: 10,
    padding: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#007AFF',
  },
});