import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen'; 
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme'; 
import { ScaledStyleSheet } from './ScaledStyleSheet';  
import { DataProvider } from '@/providers/DataProvider';
import { LoadingProvider } from '@/providers/LoadingProvider';
import { AuthProvider } from '@/providers/authProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
type RouteParams = {
  name: string;
};
 // const router = useRouter()
  // const AddPerson = () => {
  //   // router.push({
  //   //   pathname: '/AddGroups', // Путь для экрана с добавлением группы
  //   // });
  // };

  // // Функция для перехода на экран "Добавить задачу"
  // const Performers = () => {

  //   // console.log("clicked");
  //   router.push({
  //     pathname: '/UserList', // Путь для экрана с добавлением задачи
  //   });
  // };
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
    <AuthProvider>
      <DataProvider>
        <LoadingProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="sign-in" options={{ headerShown: true, title: "Авторизация", headerBackVisible: false, headerTitleAlign: 'center' }} />
          <Stack.Screen
            name="GroupDetailsPage"
            options={({ route }) => ({
              headerShown: true,
              title: (route.params as RouteParams)?.name || 'Задания группы', // Заголовок
            })}
          />
          <Stack.Screen name="AddTask" options={{ headerShown: true, title: "Добавление задачи", headerBackTitle: "Назад" }} />
          <Stack.Screen name="AddGroups" options={{ headerShown: true, title: "Добавление группы", headerBackTitle: "Назад" }} />
          <Stack.Screen name="sign-up" options={{ headerShown: true, title: "Регистрация", headerBackVisible: false, headerTitleAlign: 'center' }} />
        </Stack>
        </LoadingProvider>
      </DataProvider>
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
    // marginRight: 10,
  },
  button1: {
    marginTop: 5,
    marginLeft: 10,
    padding: 5,
  },
  button2: {
    marginTop: 10,
    marginLeft: 10,
    padding: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#007AFF', // Цвет текста кнопок
  },
});