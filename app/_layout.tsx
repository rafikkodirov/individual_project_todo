import { useFonts } from 'expo-font';
import { Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { DataProvider } from '@/providers/DataProvider';
import { LoadingProvider } from '@/providers/LoadingProvider';
import { AuthProvider } from '@/providers/authProvider';
SplashScreen.preventAutoHideAsync();
type RouteParams = {
  name: string;
};
export default function RootLayout() {
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
      <LoadingProvider>
        <DataProvider>
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
        </DataProvider>
      </LoadingProvider>
    </AuthProvider>
  );
} 