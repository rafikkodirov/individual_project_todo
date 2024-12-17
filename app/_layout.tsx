import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Button } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{headerShown: true, title: "Авторизация",headerBackVisible: false, headerTitleAlign: 'center'}} />
      <Stack.Screen name="GroupDetailsPage" options={{ headerShown: true, title: "Задания группы", headerBackTitle: "Назад" }} />
      <Stack.Screen name="AddTask" options={{ headerShown: true, title: "Добавление задачи", headerBackTitle: "Назад" }} />
      <Stack.Screen name="AddGroups" options={{ headerShown: true, title: "Добавление группы", headerBackTitle: "Назад" }} />
      <Stack.Screen name="sign-up" options={{ headerShown: true, title: "Регистрация",headerBackVisible: false,  headerTitleAlign: 'center'}}  />
    </Stack>
  );
}
