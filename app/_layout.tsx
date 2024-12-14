import i18n from "@/i18n/i18n";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react"; 

SplashScreen.preventAutoHideAsync();

type RouteParams = {
  url?: string,
  name?: string,
  category?: string;
}

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "inter_medium": require("../assets/fonts/inter_medium.otf"),
    "inter_regular": require("../assets/fonts/inter_regular.otf"),
    "inter_semi_bold": require("../assets/fonts/inter_semi_bold.otf"),
    // "Montserrat-Bold.ttf": require("../assets/fonts/Montserrat-Bold.ttf"),
    // "Montserrat-Thin.ttf": require("../assets/fonts/Montserrat-Thin.ttf"),
    // "Montserrat-SemiBold.ttf": require("../assets/fonts/Montserrat-SemiBold.ttf")
  });

 
  


  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null;

  return ( 
    <Stack>
      <Stack.Screen name="welcome_page" options={{ headerShown: false }} />
      <Stack.Screen name="card-details" options={({ route }) => ({
          headerShown: true,
          title:  (route.params as RouteParams)?.name || "Default Title", // Use dynamic title
          headerBackTitle: i18n.t('back'), // Custom back link text
       })} />
      <Stack.Screen name="loan-details" options={({ route }) => ({
          headerShown: true,
         title:  (route.params as RouteParams)?.name || "Default Title", // Use dynamic title
         headerBackTitle: i18n.t('back'), // Custom back link text
       })} />
       <Stack.Screen  name="loan-details-v2" options={({ route }) => ({
          headerShown: true,
         title:  (route.params as RouteParams)?.name || "Default Title", // Use dynamic title
         headerBackTitle: i18n.t('back'), // Custom back link text
       })} />

      <Stack.Screen name="faq_details" 
        options={({ route }) => ({
        title: (route.params as RouteParams)?.category || i18n.t('article'), // Use dynamic title,
        headerBackTitle: i18n.t('back'), // Custom back link text
        })} />

      <Stack.Screen name="credit_rating_calc" options={{ headerShown: true,
        title: i18n.t('сredit_rating') ,
        headerBackTitle: i18n.t('back'), // Custom back link text
       }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false, title: i18n.t('main') }} />
      
      <Stack.Screen
        name="webview"
        options={({ route }) => ({
          headerShown: true,
          title:  (route.params as RouteParams)?.name || "Default Title", // Use dynamic title
          headerBackTitle: i18n.t('back'), // Custom back link text
        })}
      />


    </Stack> 
  );
}