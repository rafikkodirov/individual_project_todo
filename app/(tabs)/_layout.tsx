import { Image, View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'

// import Tab1 from '../assets/icons/Tab1.png'
//TODO: import Tab1 in this code
import tab_faq from '../../assets/icons/tab_faq.png'
import cards_tab from '../../assets/icons/cards_tab.png'
import Unknown from '../../assets/icons/Unknown.png'
import { ScaledStyleSheet } from '../ScaledStyleSheet'
import i18n from '@/i18n/i18n'

// import ZaymIcon from "../assets/icons/ZaymIcon.png"
interface TabIcon {
  color: string,
  name: string
  icon: any,
  focused: boolean;
}
const TabIcon: React.FC<TabIcon> = ({ icon, focused, color, name }) => {
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
        
        <Tabs.Screen name="loans"
          options={{
            title: 'Loans',
            tabBarLabel: i18n.t('loans'),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              return <TabIcon
                icon={tab_faq}
                color={color}
                name="loans"
                focused={focused}
              />
            }
          }} />
        <Tabs.Screen name="cards" options={{
          title: 'Cards',
          tabBarLabel: i18n.t('cards'),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return <TabIcon
              icon={cards_tab}
              color={color}
              name="Cards"
              focused={focused}
            />
          }
        }} />
        <Tabs.Screen name="faqs" options={{
          title: 'Faq',
          tabBarLabel: i18n.t('faq'),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return <TabIcon
              icon={Unknown}
              color={color}
              name="Faq"
              focused={focused}
            />
          }
        }} />
        <Tabs.Screen name="loans_v2"
          options={{
            title: 'LoansV2',
            tabBarLabel: i18n.t('loans'),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              return <TabIcon
                icon={tab_faq}
                color={color}
                name="loans_v2"
                focused={focused}
              />
            }
          }} />
          
      <Tabs.Screen name="main" options={{
          title: 'Main',
          tabBarLabel: i18n.t('main'),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return <TabIcon
              icon={Unknown}
              color={color}
              name="Main"
              focused={focused}
            />
          }
        }} />

        <Tabs.Screen name="cards_v2" options={{
          title: 'Cards',
          tabBarLabel: i18n.t('cards'),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return <TabIcon
              icon={cards_tab}
              color={color}
              name="CardsV2"
              focused={focused}
            />
          }
        }} />
        <Tabs.Screen name="promotion" options={{
          title: 'Promotion',
          tabBarLabel: i18n.t('promotion'),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return <TabIcon
              icon={Unknown}
              color={color}
              name="Faq"
              focused={focused}
            />
          }
        }} />


      </Tabs>
    </>
  )
}

export default TabsLayout