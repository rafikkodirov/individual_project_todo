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
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScaledStyleSheet } from '../ScaledStyleSheet';
import { getItems } from '../services/firestore';
import { auth } from '../services/firebaseConfig';
import { logout } from '../services/authUtils';

const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  // const [user, setUser] = useState<any>(null);

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [isModalVisible, setModalVisible] = useState(false); 
  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers: any[] = await getItems('users');
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Alert.alert('Ошибка', 'Не удалось загрузить данные авторизации.');
      }
    };

    fetchUsers();
  }, []);
  const [nickname, setNickname] = useState<string>('');
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredUsers([]);
      return;
    }

    const filtered = users.filter((user) =>
      user.nickname.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };
  const handleLog = async () => {
    // router.push({
    //   pathname:"/sign-in"
    // })
    await logout()
    console.log("logout");

  }
  const handleSelectUser = (userId: string) => {
    setSelectedUser(userId === selectedUser ? null : userId); // Переключение выбора
  };


  const ModalSelectUsers: React.FC  = () => {
    return (
      <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Поиск пользователя</Text>

                {/* Поле ввода для поиска */}
                <TextInput
                  style={styles.input}
                  placeholder="Введите имя пользователя"
                  value={searchQuery}
                  onChangeText={handleSearch}
                />

                {/* Список результатов поиска */}
                <FlatList
                  data={filteredUsers}
                  keyExtractor={(item) => item.uid}
                  renderItem={({ item }) => (

                    <View style={{flex: 1, width: '100%'}}>
                      <TouchableOpacity
                        style={styles.userItem}
                        onPress={() => handleSelectUser(item.uid)}
                      >
                        {/* Круг выбора */}
                        <View style={[
                            styles.selectionCircle,
                            selectedUser === item.uid && styles.selectedCircle,
                          ]}
                        />
                        <Text style={styles.userText}>{item.nickname}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  ListEmptyComponent={
                    searchQuery !== ''
                      ? <Text style={styles.noResultsText}>Пользователи не найдены</Text>
                      : null
                  }
                />

                {/* Кнопка закрытия */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Закрыть</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
    );
  }




  return (
    <>
      <View style={styles.container}>

        <View>
          <Text style={styles.title}>Имя Пользователя</Text>
          <Text style={styles.applyTextFirst}>{nickname}</Text>
          {/* {nickname} */}
        </View>

        <View>
          {/* <Text style={styles.applyTextFirst}>111111111111111</Text> */}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}  >
            <Text style={styles.applyText}>Найти пользователя</Text>
          </TouchableOpacity>
          
            <ModalSelectUsers/>
          
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

export default AuthScreen;
function setSelectedUser(arg0: string | null) {
  throw new Error('Function not implemented.');
}

