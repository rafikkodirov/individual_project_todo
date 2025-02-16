import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { DataProvider } from '@/providers/DataProvider';
import { LoadingProvider } from '@/providers/LoadingProvider';
import { AuthProvider } from '@/providers/authProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
      pathname: '/add-task',
    });
  };

  // const colorScheme = Appearance.getColorScheme();
  // if (colorScheme === 'dark') {
  //   // Use dark color scheme
  // }
  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
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
                  title: (route.params as RouteParams)?.name || 'Задания группы',
                })}
              />
              <Stack.Screen name="add-task" options={{ headerShown: true, title: "Добавление задачи", headerBackTitle: "Назад" }} />
              <Stack.Screen name="archive" options={{ headerShown: true, title: "Архив", headerBackTitle: "Назад" }} />
              <Stack.Screen name="Information" options={{ headerShown: true, title: "Информация", headerBackTitle: "Назад" }} />
              <Stack.Screen name="AddGroups" options={{ headerShown: true, title: "Добавление группы", headerBackTitle: "Назад" }} />
              <Stack.Screen name="sign-up" options={{ headerShown: true, title: "Регистрация", headerBackVisible: false, headerTitleAlign: 'center' }} />
            </Stack>
          </DataProvider>
        </LoadingProvider>
      </AuthProvider>

    </GestureHandlerRootView>
  );
}
