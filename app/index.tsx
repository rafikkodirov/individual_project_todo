import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { View, Image } from "react-native";  
const IndexScreen = () => {
  const router = useRouter();  
  const isMounted = useRef(false); 

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => { 
      
      if (isMounted.current) {
        setTimeout(() => { 
          router.replace('/(tabs)/activeTask'); 

        }, 3000); 
      }
    };

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <View style={{height:"100%",alignItems:"center", justifyContent:"center",backgroundColor:"white"}}>
      <Image
        source={require('../assets/images/LogoSplash.jpg')}  
        resizeMode="center"
      />
    </View>
  );
};
 
export default IndexScreen;
 