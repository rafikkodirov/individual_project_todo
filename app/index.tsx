import { getData } from "@/hooks/storageUtils";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Image } from "react-native";
const IndexScreen = () => {
  const router = useRouter();
  const isMounted = useRef(false);

  const [isWelcomeShowed, setIsWelcomeShowed] = useState('false');
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const value = await getData('isWelcomeShowed') ?? 'false';

      if (isMounted.current) {
        setTimeout(() => {
          if (value === "true") {
            router.replace('/(tabs)/activeTask');
            // router.replace('/Preview_1'); // Переход на другой экран
          } else {
          router.replace('/sign-in'); // Переход на другой экран
          }
        }, 3000); // 3 seconds delay
      }
    };

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, []);
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
