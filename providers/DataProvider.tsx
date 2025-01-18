import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./authProvider";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  or,
  query,
  where,
} from "firebase/firestore";
import { getFilteredItemsV2 } from "@/app/services/firestore";
import { db } from "@/app/services/firebaseConfig";
import { AsyncStore, SecureStore } from "@/stores/global.store";
import { useLoading } from "./LoadingProvider";
interface DataContextType {
  cachedUsers: any[];
  cachedTasks: any[];
  cachedGroups: any[];
  userDoc: any;
  userData: any,
  refreshData: (entityType: DataType) => Promise<void>;
  filteredTasks: (groupId: string) => any[]; 
  addTask: (newTask: any) => Promise<void>;
  // updateTask: (task: any) => Promise<void>;
  // deleteTask: (task: any) => Promise<void>;
  refreshRequest: () => void;
}

export interface FSUserInfo {
  id: string;
  isActive: boolean;
  nickname: string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cachedTasks, setCachedTasks] = useState<any[]>([]);

  const [cachedUsers, setCachedUsers] = useState<any[]>([]);
  const [cachedGroups, setCachedGroups] = useState<any[]>([]);
  // const [loading, setLoading2] = useState(false);

  const [userData, setUserData] = useState<any>(null);
  const [whereConditionTasks, setWhereConditionTasks] = useState<any[]>([]);
  const [whereConditionGroups, setWhereConditionGroups] = useState<any[]>([]);
  const {setLoading} = useLoading()


  const { user } = useAuth();

  useEffect(() => {
    if (user !== undefined && user !== null) {
      refreshRequest();
    } else {
    }
  }, [user]);

  const refreshRequest = () => {
    AsyncStore.get<FSUserInfo>("USER_DATA").then((data) => {
      setUserData(data);
    });
  };

  const subscribeToCollection = (
    collectionPath: string,
    conditions: any[],
    onUpdate: (data: any[]) => void
  ) => {
    const q = query(
      collection(db, collectionPath),
      or(
        ...conditions.map((condition) =>
          where(condition.key, condition.operator, condition.value)
        )
      )
    );
    return onSnapshot(
      q,
      (querySnapshot) => {
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ key: doc.id, ...doc.data() });
        }); 
        onUpdate(data);
        setLoading(false); 
      },
      (error: any) => {
        console.error(`Ошибка при подписке на ${collectionPath}:`, error);
        setLoading(false);
      }
    );
  };
  useEffect(() => {
    console.log("refreshRequest ............... 4");
    if (userData && userData.id && whereConditionTasks.length > 0) {
      console.log(whereConditionTasks, "whereConditionTasks...............");

      setLoading(true);

      const unsubscribeTasks = subscribeToCollection(
        "tasks",
        whereConditionTasks,
        setCachedTasks
      );

      //   const unsubscribeGroups = subscribeToCollection(
      //     'groups',
      //     [where('owner', '==', userData.email)],
      //     setCachedGroups
      //   );

      return () => {
        unsubscribeTasks();
        // unsubscribeGroups();
      };
    }
  }, [userData, whereConditionTasks]);

  // const fetchActiveTasksData = async () => {
  //     setLoading(true);
  //     try {
  //         const tasks = await getFilteredItemsV2('tasks', whereConditionTasks);
  //         setCachedTasks(tasks);
  //     } catch (error) {
  //         console.error('Ошибка при загрузке данных:', error);
  //     } finally {
  //         setLoading(false);
  //     }
  // };

  useEffect(() => {
    if (userData) {
      setWhereConditionTasks([
        {
          key: "ownerId",
          operator: "==",
          value: userData.id,
        },
        {
          key: "performerId",
          operator: "==",
          value: userData.id,
        },
      ]);
      // setWhereConditionGroups([{
      //     key: "owner",
      //     operator: "==",
      //     value: userData.email,
      // }]);
    }
  }, [userData]);

  const addElementToTheFirebase = (path: string, element: any) => {
    const tasksCollectionRef = collection(db, path);
    return addDoc(tasksCollectionRef, element);
  };
  const addTask = async (newTask: any) => {
    try {
      newTask.ownerId = userData.id;
      newTask.ownerName = userData.nickname;
      await addElementToTheFirebase("tasks", newTask);
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
  };

  //   useEffect(() => {
  //     if (userData && userData.id) {
  //       const unsubscribe = onSnapshot(
  //         query(collection(db, 'tasks'), where('ownerId', '==', userData.id)),
  //         (querySnapshot) => {
  //           const tasks: any[] = [];
  //           querySnapshot.forEach((doc) => {
  //             tasks.push({ key: doc.id, ...doc.data() });
  //           });
  //           setCachedTasks(tasks); // Обновляем задачи в состоянии
  //         },
  //         (error) => {
  //           console.error('Ошибка при получении задач через onSnapshot:', error);
  //         }
  //       );

  //       // Отписываемся при размонтировании компонента
  //       return () => unsubscribe();
  //     }
  //   }, [userData]);

  const [userDoc, setUserDoc] = useState<any>(null);
  useEffect(() => {
    if (user !== undefined) {
      // fetchUserData();
      fetchGroupData();
      // fetchActiveTasksData();

      if (!user?.email) return;
      const docRef = doc(db, `users/${user?.email}`);
      // Start observing the document
      const unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setUserDoc(snapshot.data());
          } else {
            console.warn("Document does not exist");
            setUserDoc(null);
          }
          setLoading(false);
        },
        (error) => {
          console.error("Error observing document:", error);
          setLoading(false);
        }
      );

      // Clean up listener on unmount
      return () => unsubscribe();
    }
  }, [user]);

  // const fetchUserData = async () => {
  //     setLoading(true);
  //     try {
  //         const users = await getFilteredItemsV2('users', []);
  //         setCachedUsers(users);
  //     } catch (error) {
  //         console.error('Ошибка при загрузке данных:', error);
  //     } finally {
  //         setLoading(false);
  //     }
  // };

  const fetchGroupData = async () => {
    setLoading(true);
    try {
      const groups = await getFilteredItemsV2("groups", []);
      setCachedGroups(groups);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //     if (userData && userData.id) {
  //       const unsubscribe = onSnapshot(
  //         query(collection(db, 'tasks'), where('ownerId', '==', userData.id)),
  //         (querySnapshot) => {
  //           const tasks: any[] = [];
  //           querySnapshot.forEach((doc) => {
  //             tasks.push({ key: doc.id, ...doc.data() });
  //           });
  //           setCachedTasks(tasks); // Обновляем задачи в состоянии
  //         },
  //         (error) => {
  //           console.error('Ошибка при получении задач через onSnapshot:', error);
  //         }
  //       );

  //       // Отписываемся при размонтировании компонента
  //       return () => unsubscribe();
  //     }
  //   }, [userData]);

  const refreshData = async (entityType: DataType) => {
    switch (entityType) {
      case DataType.Users:
        // await fetchUserData();
        break;
      case DataType.Tasks:
        // await fetchActiveTasksData()
        break;
      case DataType.Groups:
        await fetchGroupData();
        break;
      default:
        break;
    }
  };

  const filteredTasks = (groupId: string): any[] => {
    try {
      if (cachedTasks.length > 0) {
        return cachedTasks.filter((task: any) => task.groupId === groupId);
      }
      return [];
    } catch (error) {
      return [];
    }
  };

  return (
    <DataContext.Provider
      value={{
        cachedUsers,
        cachedTasks,
        cachedGroups,
        refreshData,
        filteredTasks,
        userDoc, 
        addTask,
        userData,
        // updateTask,
        // deleteTask,
        refreshRequest,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export enum DataType {
  Users,
  Tasks,
  Groups,
}

// Хук для доступа к данным
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext должен использоваться внутри DataProvider");
  }
  return context;
};
