import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Button,
  TextInput,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import UserListCard from "@/components/UserListCard";
import Dialog from "@/Common/DialogComponent ";
import styles from "../../../styles/styles.android";
import { useDataContext } from "@/providers/DataProvider";
import { useLoading } from "@/providers/LoadingProvider";
import { useLocalSearchParams } from "expo-router";
import { Loading02Icon } from "@/components/Loading02Icon";
import { query } from "firebase/firestore";
const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [usersInSearch, setUsersInSearch] = useState<any[]>([]);
  const [isOwner, setIsOwner] = useState(false);

  const [performer, setPerformer] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
  const {
    getUsersByGroupId,
    setSelectedUserId,
    addUsersToGroup,
    removeUsersFromGroup
  } = useDataContext();
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoading } = useLoading()
  const [filteredU, setFiltered] = useState<any[]>([]);
  const { getUsers, userData, userSync } = useDataContext();
  const { owner, groupId } = useLocalSearchParams();

  useEffect(() => {
    getUsers().then((data) => {
      /* The `setUsersInSearch` function is updating the state variable `usersInSearch` with a new
      array of objects. Each object in the new array is created by mapping over the `data` array and
      transforming each element into a new object with the properties `key`, `nickname`, and
      `isSelected`. */
      setUsersInSearch(
        data.map((element) => {
          return {
            key: element.key,
            nickname: element.nickname,
            isSelected: false,
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    setIsOwner(userData.id === owner);
  }, [userData.id, owner]);

  useEffect(() => {
    // getUsersByGroupId Получает юзеров по группе затем создает новый массив дял юзеров с новыми элементами
    getUsersByGroupId(groupId.toString()).then((data) => {
      setUsers(
        data.map((element) => {
          return {
            key: element.key,
            nickname: element.nickname,
            isSelected: false,
          };
        })
      );
    });
  }, [userSync]);

  const handleSearch = (query: string) => {
    /* The code snippet you provided is filtering the `usersInSearch` array based
    on a search query. Here's a breakdown of what it's doing: */
    setSearchQuery(query);

    const filtered = usersInSearch.filter(
      (user) =>
        // Ищет юзера по заниженному никнейму
        user.nickname.toLowerCase().includes(query.toLowerCase()) &&
        !users.some((groupUser) => groupUser.key === user.key)
    );
    setFiltered(filtered);
  };
  const handleCloseDialog = () => {
    setUsersInSearch((prevUsers) =>
      prevUsers.map((user) => ({ ...user, isSelected: false }))
    );
    setConfirmationDialogVisible(false); // Закрываем диалог
  };
  const displayedUsersInSearsh = searchQuery.trim()
    ? filteredU
    : usersInSearch.filter(
      (user) => !users.some((groupUser) => groupUser.key === user.key)
    );
     

    const showSearch =
    
    displayedUsersInSearsh.length > 4 || searchQuery.length > 0;
  
  const ITEM_HEIGHT = 50;
  useEffect(() => {
    setSelectedUserId(performer);
  }, []);

  const addUserFunc = async () => {
    const selUsers = usersInSearch.filter((user) => user.isSelected == true);

    if (selUsers.length == 0) {
      alert("Пожалуйста, выберите пользователя!");
      return;
    }
    // const newUser = {
    //   nickname: performer.name,
    // };

    try {
      await addUsersToGroup(
        selUsers.map((user) => ({
          id: user.key,
          nickname: user.nickname,
          isActive: true,
        }))
      );
      setUsersInSearch((prevUsers) =>
        prevUsers.map((user) => ({ ...user, isSelected: false }))
      );
      setConfirmationDialogVisible(false);
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
  };
  const removeUserFunc = async () => {

    const selUsers = users.filter(
      (user) => user.isSelected === true && user.key !== owner // Исключаем владельца
    );
    if (selUsers.length === 0) {
      alert("Пожалуйста, выберите пользователя!");
      return;
    }

    Alert.alert(
      "Подтвердите удаление",
      selUsers.length > 1
        ? "Вы уверены, что хотите удалить этих пользователей?"
        : "Вы уверены, что хотите удалить этого пользователя?",
      [
        { text: "Отмена", style: "cancel" },
        {
          text: "Удалить",
          style: "destructive",
          onPress: async () => { // Только после нажатия "Удалить" выполняется этот код
            try {
              await removeUsersFromGroup(
                selUsers.map((user) => ({
                  id: user.key,
                  nickname: user.nickname,
                }))
              );

              setUsers((prevUsers) =>
                prevUsers.map((user) => ({ ...user, isSelected: false }))
              );

              setConfirmationDialogVisible(false);
            } catch (error) {
              console.error("Ошибка при удалении пользователей:", error);
            }
          }
        }
      ]
    );
  };

  const isMainListSelectedUsersExists = useCallback(() => {
    return users.some((user) => user.isSelected);
  }, [users]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, padding: 20 }}>
          <FlatList
            data={users}
            numColumns={2} // Указываем количество колонок
            style={{ flexGrow: 1 }}
            contentContainerStyle={{ paddingBottom: 16 }}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View style={{ flex: 1, margin: 1 }}>
                {isOwner ? (

                  <TouchableOpacity
                    onPress={() => {
                      if (item.key !== owner) {
                        setUsers((prevUsers) =>
                          prevUsers.map((user) =>
                            user.key === item.key
                              ? { ...user, isSelected: !user.isSelected }
                              : user
                          )
                        );
                      }
                    }}
                  >
                    <UserListCard user={item} />
                  </TouchableOpacity>
                ) : (
                  <UserListCard user={item} />
                )}
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Text style={styles.header}>Нет пользователей</Text>
              </View>
            )}
          />
          {isOwner ? (
            <View style={styles.buttonContainerInDetails}>
              {isMainListSelectedUsersExists() ? (
                <TouchableOpacity
                  style={{ ...styles.buttonInDetails, backgroundColor: "#dd1c1c" }}
                  onPress={removeUserFunc}
                >

                  <Text style={styles.applyText}>Удалить</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.buttonInDetails}
                  onPress={() => setConfirmationDialogVisible(true)}
                >
                  <Text style={styles.applyText}>Добавить пользователя</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            ""
          )}
          <Dialog
            isVisible={confirmationDialogVisible}
            onClose={handleCloseDialog}
            dialogWidth={"100%"}
            scrollable={false}
          >
            <View style={{ padding: 16 }}>
              {/* Поле поиска */}
              {showSearch && (
                <TextInput
                  style={styles.searchInput}
                  placeholder="Поиск пользователя..."
                  value={searchQuery}
                  onChangeText={handleSearch}
                />
              )}

              <View style={{ maxHeight: ITEM_HEIGHT * 5 }}>
                {/* Список пользователей */}
                <FlatList
                  data={displayedUsersInSearsh}
                  keyExtractor={(item) => item.key}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "#ccc",
                      }}
                      onPress={() => {
                        //handleUserSelect(item.key, item.nickname);

                        setUsersInSearch((prevUsers) =>
                          prevUsers.map((user) =>
                            user.key === item.key
                              ? { ...user, isSelected: !user.isSelected }
                              : user
                          )
                        );
                      }}
                    >
                      <Text
                        style={{
                          ...styles.groupText,
                          fontWeight: item.isSelected ? "700" : "300",
                          color: item.isSelected ? "#007bff" : "gray",
                        }}
                      >
                        {item.nickname}
                      </Text>

                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={() => (
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ ...styles.header, fontSize: 24 }}>
                        Нет пользователей
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
            {isLoading && (
              <View style={{ ...styles.overlay, backgroundColor: "" }}>
                <Loading02Icon fill="blue" />
              </View>
            )}
            {displayedUsersInSearsh.length > 0 ? (

              <View style={{ marginTop: 10 }}>

                <Button
                  title="Добавить"
                  onPress={addUserFunc}
                  color="#007bff"
                />
              </View>
            ) : (
              ""
            )}
          </Dialog>
        </View>
      </SafeAreaView>
    </>
  );
};
export default UserList;
