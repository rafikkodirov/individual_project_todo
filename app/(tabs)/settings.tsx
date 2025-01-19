{/* <Text style={styles.title}>Авторизация</Text>

      <TextInput
        style={styles.input}
        placeholder="Введите email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Введите пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDown} onPress={handleReg}>
        <Text style={styles.buttonText}>Зарегистрироваться</Text>
      </TouchableOpacity>*/}
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { logout } from '../services/authUtils';
import { useDataContext } from '@/providers/DataProvider';
import { SecureStore } from '@/stores/global.store';
 
const Settings: React.FC = ()=> { 
  const router = useRouter();
   const { userData } = useDataContext(); 
  const handleLog = async () => { 
    SecureStore.delete(["USER"])
    await logout()
    router.push({
      pathname: "/sign-in"
    })
    console.log("logout");

  } 
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Имя Пользователя</Text>
          <Text style={styles.applyTextFirst}>{userData.nickname}</Text>
        </View> 
        <View> 
        </View>  
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLog} >
            <Text style={styles.applyText}>Выйти из аккаунта</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  selectedCircle: {
    backgroundColor: '#007bff',
  },
  selectionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007bff',
    marginRight: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'stretch',

  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  // input: {
  //   width: '100%',
  //   height: 40,
  //   borderColor: '#ccc',
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   paddingHorizontal: 10,
  //   marginBottom: 15,
  // },
  userItem: {
    flexDirection: 'row',
    marginBottom: 5,
    // paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    width: '100%',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    color: 'black',
  },
  userText: {
    fontSize: 16,
  },
  noResultsText: {
    fontSize: 16,
    color: '#777',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    // marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  buttonContainer: {
    flexGrow: 1,
    width: "100%",
    // backgroundColor: 'green', // Фон для контента
    justifyContent: 'flex-end', // Align items to the bottom of the container 

  },

  button: {
    marginHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#007BFF', // Цвет фона кнопки
    textAlign: "center",
    alignItems: 'center', // Центрирование по горизонтали
    borderRadius: 10,
    color: 'white',
  },
  applyText: {
    fontSize: 20,
    color: "#fff",

    textAlign: "center",
  },
  applyTextFirst: {
    fontSize: 30,
    marginTop: "4%",
    marginBottom: "40%",
    color: "black",

    textAlign: "center",

  },
  applyTextSecond: {
    fontSize: 30,
    marginTop: "4%",
    color: "black",
    justifyContent: "center",
    textAlign: "center",

  },
  center: {

    justifyContent: "center",
    textAlign: "center",
  },
  // button: {
  //   width: '100%',
  //   height: 50,
  //   backgroundColor: '#007bff',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 5,
  // },
  buttonDown: {
    width: '100%',
    height: 50,
    marginTop: "15%",
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Settings;
 
