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
import ModalSearchUsers from '../ModalSearchUser';
import ModalDeleteGroups from '../ModalDeleteGroups';
import { getData } from '@/hooks/storageUtils';
import { useDataContext } from '../DataProvider';
interface AddTaskScreenProps {
  userId: string; // Идентификатор текущего пользователя
}
const Settings: React.FC<AddTaskScreenProps> = ({userId}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  // const [user, setUser] = useState<any>(null);

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const router = useRouter();

  const [groups, setGroups] = useState<any[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleGroups, setModalVisibleGroups] = useState(false);
 
  const [whereCondition, setWhereCondition] = useState<any[]>([]);  
  const [userData, setUserData] = useState<any>(null);
  const { userDoc } = useDataContext(); 
  

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataStr = await getData("userData");
      const parsedUserData = JSON.parse(userDataStr);
      setUserData(parsedUserData);
    };  
    fetchUserData();
  }, []); 
   
  useEffect(() => {
    setNickname(userData?.nickname || '');
  }, [userData]);  

  
  

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {

        const fetchedUsers: any[] = await getItems('users');
        setUsers(fetchedUsers);
        // const currentUser = fetchedUsers.find(user => user.id === userId);
        // if (currentUser) {
        //   setNickname(currentUser.nickname || '');
        //   console.log(currentUser,"1111111111111111111111111111111d")
          
        // } else {
        //   console.warn('Пользователь не найден');
        // }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };
 
    fetchUsers();
  }, [userId]);
  const fetchGroups = async () => {
    const fetchedGroups: any[] = await getItems('groups');
    setGroups(fetchedGroups);
    setFilteredGroups(fetchedGroups);
  };

  useEffect(() => {
    fetchGroups();
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
  const handleDeleteSuccess = () => {
    fetchGroups(); // Обновить список групп после удаления
  };
  const handleLog = async () => {
    // router.push({
    //   pathname:"/sign-in"
    // })
    await logout()
    console.log("logout");

  }
  const handleSearchGroups = (query: string) => {
    setSearchQuery(query);
    const filtered = groups.filter((group) =>
      group.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGroups(filtered);
  };
  const handleSelectUser = (userId: string) => {
    setSelectedUser(userId === selectedUser ? null : userId); // Переключение выбора
  };
 

  return (
    <>
      <View style={styles.container}>

        <View>
          <Text style={styles.title}>Имя Пользователя</Text>
          <Text style={styles.applyTextFirst}>{userDoc.nickname}</Text>
          {/* {nickname} */}
          
        </View>
 
        <View>
          {/* <Text style={styles.applyTextFirst}>111111111111111</Text> */}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}  >
            <Text style={styles.applyText}>Найти пользователя</Text>
          </TouchableOpacity>
          <ModalSearchUsers
            isVisible={isModalVisible}
            onClose={() => setModalVisible(false)}
            users={users}
            filteredUsers={filteredUsers}
            searchQuery={searchQuery}
            onSearch={handleSearch}
            selectedUser={selectedUser}
            onSelectUser={handleSelectUser}
          />
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
 
