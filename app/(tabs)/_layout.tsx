import { Image, View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'

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
const styles = ScaledStyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 12,
  },
});
const TabsLayout = () => {
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
                name="loans"
                focused={focused}
              />
            }
          }} />
          <Tabs.Screen name="frame2"
          options={{
            title: 'Группы', 
            tabBarLabel:"Группы", 
            tabBarIcon: ({ color, focused }) => {
              return <TabIcon 
                icon={react_logo}
                color={color}
                name="loans"
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
                name="loans"
                focused={focused}
              />
            }
          }} />


      </Tabs>
    </>
  )
}

export default TabsLayout