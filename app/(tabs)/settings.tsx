import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router'; 
import { useDataContext } from '@/providers/DataProvider';
import { SecureStore } from '@/stores/global.store';
import { logout } from '../services/authUtils';
const styles = Platform.OS === 'android'
  ? require('../../styles/styles.android').default
  : require('../../styles/styles.android').default;
const Settings: React.FC = () => {
  const router = useRouter();
  const { userData } = useDataContext();
  const handleLog = async () => {
    SecureStore.delete(["USER"])
    await logout()
    userData(null)
    router.push({
      pathname: "/sign-in"
    })
    console.log("logout");

  }
  return (
    <>
      <View style={{
        flex: 1,justifyContent: 'center',alignItems: 'center',
      }}>
        <View>
          <Text style={styles.titleInSettings}>Имя Пользователя</Text>
          <Text style={styles.applyTextFirst}>{userData?.nickname || "Не указан"}</Text>
        </View>
        <View>
        </View>
        <View style={styles.buttonContainerInDetails}>
          <TouchableOpacity style={styles.button} onPress={handleLog} >
            <Text style={styles.applyText}>Выйти из аккаунта</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Settings;

