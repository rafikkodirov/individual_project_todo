import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useDataContext } from '@/providers/DataProvider';
import { SecureStore } from '@/stores/global.store';
import { logout } from '../services/authUtils'; 
const Settings: React.FC = () => {
  const router = useRouter();
  const { userData,clearAllSubscriptions  } = useDataContext();
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
    clearAllSubscriptions()
    SecureStore.delete(["USER"])
    await logout()
    userData(null)
    router.push({
      pathname: "/auth/screens/sign-in"
    })

  }
  return (
    <>
      <View style={styles.container}>
      {/* Блок пользователя */}
      <View style={styles.card}>
        <Text style={styles.label}>Пользователь:</Text>
        <Text style={styles.nickname}>{userData?.nickname || "Не указан"}</Text>
      </View>

      {/* Кнопки "Посмотреть информацию" и "Посмотреть архив" */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.infoButton} onPress={handleInfo}>
          <Text style={styles.infoText}>ℹ️ Посмотреть информацию</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.archiveButton} onPress={handleArchive}>
          <Text style={styles.archiveText}>📂 Посмотреть архив</Text>
        </TouchableOpacity>
      </View>
 
      <TouchableOpacity style={styles.logoutButton} onPress={handleLog}>
        <Text style={styles.logoutText}> Выйти из аккаунта</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  nickname: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#2061b7",
    borderRadius: 10,
    alignItems: "center",
  
    marginRight: 10,
  },
  archiveButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "gray",
    borderRadius: 10,
    alignItems: "center",
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    
    textAlign:"center",
  },
  archiveText: {
    color: "#fff",
    fontSize: 16,
    textAlign:"center",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default Settings;