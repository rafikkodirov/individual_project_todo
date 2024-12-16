import { Image, View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { Tabs, Redirect, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
// import Tab1 from '../assets/icons/Tab1. 
// import react_logo from '../../assets/react_logo.png'
import react_logo from '../../assets/images/react-logo.png'
import cards_tab from '../../assets/icons/cards_tab.png'
import Unknown from '../../assets/icons/Unknown.png'
import { ScaledStyleSheet } from '../ScaledStyleSheet' 
// import ZaymIcon from "../assets/icons/ZaymIcon.png"
interface TabIcon {
  color: string,
  name: string
  icon: any,
  focused: boolean;
}
const TabIcon: React.FC<TabIcon> = ({ icon,  focused, color, name }) => {
  return (
    <View>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.icon, { tintColor: color }]} />
      {/* {focused && <Text className="text-xs">{name}</Text>} */}
    </View>
  )
}
//  const router = useRouter();
//   const handleGroupes = () => {
//     router.push({
//       pathname: "/AddGroups"
//     })
//   }
// const handleTasks =  () => { 
//   router.push({
//     pathname: "/AddTask"
//   })
// };
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
    color: '#007AFF', // Цвет текста кнопок
  },
});
const TabsLayout = () => {
  const router = useRouter(); // Используем useRouter для навигации

  // Функция для перехода на экран "Добавить группу"
  const handleGroups = () => {
    router.push({
      pathname: '/AddGroups', // Путь для экрана с добавлением группы
    });
  };

  // Функция для перехода на экран "Добавить задачу"
  const handleTasks = () => {
    router.push({
      pathname: '/AddTask', // Путь для экрана с добавлением задачи
    });
  };
  return (
    <>
      <Tabs>
        
        <Tabs.Screen name="activeTask"
          options={{
            title: 'Активные Задания', 
            tabBarLabel:"Задания",
            tabBarIcon: ({ color, focused }) => {
              return <TabIcon 
                icon={react_logo}
                color={color}
                name="Задания"
                focused={focused}
              />
            }
          }} />
          <Tabs.Screen name="frame2"
          options={{
            title: 'Группы', 
            headerRight: () => (
              <View style={styles.headerButtonsContainer}>
              {/* Первая кнопка */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleTasks}
              > 
              <Ionicons name="checkbox-outline" size={24}  />
              </TouchableOpacity>

              {/* Вторая кнопка */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleGroups}
              >
              <Ionicons name="people" size={24} color="black" />
              </TouchableOpacity>
            </View>),
            tabBarLabel:"Группы", 
            tabBarIcon: ({ color, focused }) => {
              return <TabIcon 
                icon={react_logo}
                color={color}
                name="Группы"
                focused={focused}
              />
            }
          }} />
           <Tabs.Screen name="frame3"
          options={{
            title: 'Настройки', 
            tabBarLabel:"Настройки", 
            tabBarIcon: ({ color, focused }) => {
              return <TabIcon 
                icon={react_logo}
                color={color}
                name="Настройки"
                focused={focused}
              />
            }
          }} />


      </Tabs>
    </>
  )
}

export default TabsLayout