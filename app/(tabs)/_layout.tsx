import { Image, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import Dialog from '@/Common/DialogComponent ';
import people from '../../assets/images/people.png'
import edit from '../../assets/images/edit.png'
import settings from '../../assets/images/settings.png'
import { ScaledStyleSheet } from '../../Common/ScaledStyleSheet'
import { AppUser, useAuth } from '@/providers/authProvider';
import { SecureStore } from '@/stores/global.store';
import AddGroupScreen from '../add-group';
import { Loading02Icon } from '@/components/Loading02Icon';
import { useLoading } from '@/providers/LoadingProvider';
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
    </View>
  )
}
const styles = ScaledStyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Полупрозрачный фон
    zIndex: 1000,
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
    color: '#007AFF',
  },
});
const TabsLayout = () => {

  const { isLoading } = useLoading()
  const router = useRouter();
  const { user, loading, reLogin } = useAuth();
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] = useState<boolean>(false);

  useEffect((): void => {
    if (reLogin === true)
      router.replace("/sign-in");
  }, [reLogin])

  useEffect(() => {
    if (!loading && !user) {
      const savedUser = SecureStore.get<AppUser>("USER");
      if (savedUser === null)
        router.replace("/sign-in");
    }
  }, [user, loading]);

  return (

    <>
      <Tabs>

        <Tabs.Screen name="activeTask"
          options={{
            title: 'Активные Задания',

            tabBarLabel: "Задания",
            tabBarIcon: ({ color, focused }) => {
              return <TabIcon
                icon={edit}
                color={color}
                name="Задания"
                focused={focused}
              />
            }
          }} />
        <Tabs.Screen name="groups"
          options={{
            title: 'Группы',
            headerRight: () => (
              <View style={styles.headerButtonsContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setIsConfirmationDialogVisible(true)} >

                  <Ionicons name="add" size={24} color="black" />

                  <Dialog isVisible={isConfirmationDialogVisible} onClose={() => setIsConfirmationDialogVisible(false)} dialogWidth={'100%'} scrollable={false}  >
                    {isLoading && (
                      <View style={{ ...styles.overlay, backgroundColor: "" }}>
                        <Loading02Icon fill="blue" width="42" height="42" />
                      </View>
                    )}
                    <AddGroupScreen closeModal={() => setIsConfirmationDialogVisible(false)} />
                  </Dialog>

                </TouchableOpacity>
              </View>),
            tabBarLabel: "Группы",
            tabBarIcon: ({ color, focused }) => {
              return <TabIcon
                icon={people}
                color={color}
                name="Группы"
                focused={focused}
              />
            }
          }} />
        <Tabs.Screen name="settings"
          options={{
            title: 'Настройки',
            tabBarLabel: "Настройки",
            tabBarIcon: ({ color, focused }) => {
              return <TabIcon
                icon={settings}
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