import { getData } from "@/hooks/storageUtils";
import { useAuth } from "@/providers/authProvider";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Image } from "react-native";
const IndexScreen = () => {
  const router = useRouter();
  const isMounted = useRef(true);

  const { user, loading, reLogin } = useAuth(); 
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
    // useEffect(() => {
    //   if (!loading && !user) {
    //     const savedUser = SecureStore.get<AppUser>("USER");
    //     if (savedUser === null)
    //       router.replace("/auth/screens/sign-in");
    //   }
    // }, [user, loading]);
    useEffect(() => {
      isMounted.current = true;

      const fetchData = async () => {
        const value = await getData('isWelcomeShowed') ?? 'false';
        if(isMounted.current && !loading){
          setTimeout(()=>{
            if(value === "true" && user){
              router.replace('/(tabs)/activeTask');
            } else{
              router.replace('/auth/screens/sign-in');
            }
          },3000)
        }
      };

      fetchData()

      return () => {
        isMounted.current = false
      };
    },[user,loading])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const value = await getData('isWelcomeShowed') ?? 'false';

  //     if (isMounted.current) {
  //       setTimeout(() => {
  //         if (value === "true" && user) {
  //           router.replace('/(tabs)/activeTask');
  //           // router.replace('/Preview_1'); // Переход на другой экран
  //         } else {
  //         router.replace('/auth/screens/sign-in'); // Переход на другой экран
  //         }
  //       }, 3000); // 3 seconds delay
  //     }
  //   };

  //   fetchData();

  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, []);
  return (
    <View style={{ height: "100%", alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
      <Image
        source={require('../assets/images/LogoSplash.jpg')}
        resizeMode="center"
      />
    </View>
  );
};

export default IndexScreen;