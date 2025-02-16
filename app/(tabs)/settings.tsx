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
  const handleArchive = () => {
    router.push({
      pathname: "/archive"
    })
  }
  const handleInfo = () => {
    router.push({
      pathname: "/Information"
    })
  }
  const handleLog = async () => {
    SecureStore.delete(["USER"])
    await logout()
    userData(null)
    router.push({
      pathname: "/sign-in"
    })

  }
  return (
    <>
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center',
      }}>
        <View style={styles.rowStyle}>
          <Text style={styles.titleInSettings}>Пользователь:</Text>
          <Text style={styles.applyTextFirst}>{userData?.nickname || "Не указан"}</Text>
        </View>
        <View>
        </View>
        
        <View style={styles.buttonContainerInDetails}>
          <TouchableOpacity style={styles.button} onPress={handleLog} >
            <Text style={styles.applyText}>Выйти из аккаунта</Text>
          </TouchableOpacity>
        </View> 
        <TouchableOpacity style={{marginTop:"-5%"}} onPress={handleInfo} >
          <Text style={{ ...styles.applyText, color: "#2061b7" }}>Посмотреть информацию</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={{padding:10}} onPress={handleArchive} >
          <Text style={{ ...styles.applyText, color: "gray" }}>Посмотреть архив</Text>
        </TouchableOpacity>
        
      </View>
    </>
  );
};

export default Settings;

