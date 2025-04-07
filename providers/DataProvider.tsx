import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./authProvider";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getItems } from "@/app/services/firestore";
import { db } from "@/app/services/firebaseConfig";
import { AsyncStore } from "@/stores/global.store";
import { useLoading } from "./LoadingProvider";
import { TaskStatuses } from "@/Common/TaskStatuses";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

interface DataContextType {
  cachedUsers: any[];
  cachedTasks: any[];
  cachedArchiveRowTasks: any[]
  cachedPerformTasks: any[];
  concatenateTasks: any[];
  cachedGroups: any[];
  userDoc: any;
  userData: any,
  userSync: number,
  selectedGroupId: string | null;
  setSelectedGroupId: (id: string | null) => void;
  selectedGroup: Group  | null;
  setSelectedGroup: (group: Group | null) => void;
  selectedUserId: string | null;
  setSelectedUserId: (id: any | null) => void;
  filteredTasks: (groupId: string) => any[];
  addTask: (newTask: any) => Promise<void>;
  addUser: (newUser: any) => Promise<void>;
  addUsersToGroup: (selectedUsers: any[]) => Promise<void>;
  removeUsersFromGroup: (selectedUsers: any[]) => Promise<void>;
  addGroups: (newTask: any) => Promise<void>;
  deleteGroupOwner: (groupId: any, isOwner: boolean) => Promise<void>;
  getUsersByGroupId: (groupId: string) => Promise<any[]>;
  getUsers: () => Promise<any[]>;
  refreshRequest: () => void;
}

export interface FSUserInfo {
  id: string;
  isActive: boolean;
  nickname: string;

}
interface Group {
  groupName: string;
  color: string;
  owner: string;
  ownerId: string;
}
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cachedTasks, setCachedTasks] = useState<any[]>([]);
  const [cachedRowTasks, setCachedRowTasks] = useState<any[]>([]);
  const [cachedPerformTasks, setCachedPerformTasks] = useState<any[]>([]);
  const [cachedPerformRowTasks, setCachedPerformRowTasks] = useState<any[]>([]);
  const [cachedArchiveRowTasks, setCachedArchiveRowTasks] = useState<any[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [concatenateTasks, setConcatenateTasks] = useState<any[]>([]);
  const [cachedUsers, setCachedUsers] = useState<any[]>([]);
  const [cachedGroups, setCachedGroups] = useState<any[]>([]);
  const [userSync, setUserSync] = useState<number>(0)
  const [userData, setUserData] = useState<any>(null);
  const [whereConditionTasks, setWhereConditionTasks] = useState<any[]>([]);
  const [wherePerformConditionTasks, setPerformWhereConditionTasks] = useState<any[]>([]);
  const [whereArchiveConditionTasks, setArchiveWhereConditionTasks] = useState<any[]>([]);
  const { isLoading, setLoading } = useLoading()


  const { user } = useAuth();

  useEffect(() => {
    setConcatenateTasks([...cachedRowTasks, ...cachedPerformRowTasks])
  }, [cachedTasks, cachedPerformTasks])


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
      ...conditions.map((condition) =>
        where(condition.key, condition.operator, condition.value)
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
    if (userData && userData.id && whereConditionTasks.length > 0) {

      setLoading(true);

      const unsubscribeTasks = subscribeToCollection(
        "tasks",
        whereConditionTasks,
        setCachedRowTasks
      );

      return () => {
        unsubscribeTasks();
      };
    }
  }, [userData, whereConditionTasks]);


  useEffect(() => {
    if (userData && userData.id) {
      setLoading(true);
      const unsubscribeUsers = subscribeToCollection(
        "users",
        [],
        setCachedUsers
      );
      return () => {
        unsubscribeUsers();
      };
    }
  }, [userData, whereConditionTasks]);


  useEffect(() => {
    if (userData && userData.id && wherePerformConditionTasks.length > 0) {

      setLoading(true);

      const unsubscribePerformTasks = subscribeToCollection(
        "tasks",
        wherePerformConditionTasks,
        setCachedPerformRowTasks
      );

      return () => {
        unsubscribePerformTasks();
      };
    }
  }, [userData, wherePerformConditionTasks]);
  useEffect(() => {
    if (userData && userData.id && whereArchiveConditionTasks.length > 0) {

      setLoading(true);

      const unsubscribeArchiveTasks = subscribeToCollection(
        "tasks",
        whereArchiveConditionTasks,
        setCachedArchiveRowTasks
      );

      return () => {
        unsubscribeArchiveTasks();
      };
    }
  }, [userData, whereArchiveConditionTasks]);

  // useEffect(() => {
  //   const sortedTasks = [...cachedRowTasks].sort(
  //     (a, b) => new Date(a.endTime.toDate()).getTime() - new Date(b.endTime.toDate()).getTime()
  //   );



  //   const updatedTasks = cachedRowTasks.map((task: any) => {

  //     const now = new Date().getTime(); // Текущее время
  //     const taskEndTime = new Date(task.endTime.toDate()).getTime();
  //     const oneDayInMs = 24 * 60 * 60 * 1000; // миллисекунд в одном дне 
  //     const isExpired = taskEndTime < now  //Eсли не выбрать день то срок будет ровно 1 день

  //     // Если статус уже "expired", не обновляем
  //     if (isExpired && task.status !== "expired") { 
  //       const taskRef = doc(db, "tasks", task.key);
  //       updateDoc(taskRef, { status: "expired" }).catch((error) =>
  //         console.error("Ошибка обновления статуса:", error)
  //       );

  //       return { ...task, status: "expired" }; // Обновляем локально
  //     }

  //     return task;
  //   });
  //   sortedTasks.forEach(async (element: any) => {
  //     element.isOwner = element.ownerId === userData.id;

  //   }
  //   );

  //   setCachedTasks([...sortedTasks]); // Создаём новый массив, чтобы React отследил изменения
  // }, [cachedRowTasks]);

  useEffect(() => {


    // Step 2: Update tasks with 'expired' status if needed
    const now = new Date().getTime();
    const updatedTasks = cachedRowTasks.map((task: any) => {
      const taskEndTime = new Date(task.endTime.toDate()).getTime();
      const isExpired = taskEndTime < now;

      if (isExpired && task.status !== "expired") {
        // If expired and status is not already "expired", return the updated task
        return { ...task, status: "expired" };
      }
      return task;
    });

    // Step 3: Update tasks that are expired in Firestore
    const expiredTasks = updatedTasks.filter((task: any) => task.status === "expired");

    // If there are tasks with status 'expired', update them in Firestore
    const updatePromises = expiredTasks.map((task) => {
      const taskRef = doc(db, "tasks", task.key);
      return updateDoc(taskRef, { status: "expired" }).catch((error) => {
        console.error("Error updating task status:", error);
      });
    });

    // Wait for all updates to complete (if any)
    Promise.all(updatePromises).then(() => {
      // Step 4: Update `cachedTasks` with the final tasks array
      setCachedTasks(updatedTasks);

      // Step 5: Set ownership flag for each task
      updatedTasks.forEach((task: any) => {
        task.isOwner = task.ownerId === userData.id;
      });
    });
  }, [cachedRowTasks, userData]); // Trigger effect when `cachedRowTasks` or `userData` changes


  useEffect(() => {
    const sortedTasks = cachedPerformRowTasks.sort((a, b) => new Date(a.endTime.toDate()).getTime() - new Date(b.endTime.toDate()).getTime())
    sortedTasks.forEach(
      (element: any) => {
        element.isOwner = element.ownerId === userData.id
      }
    );
    setCachedPerformTasks(sortedTasks)
  }, [cachedPerformRowTasks])

  const getUsersByGroupId = async (groupId: string) => {
    const data = await getItems(`groups/${groupId}/users`);
    return data;
  }
  const getUsers = async () => {
    const data = await getItems(`users`);
    return data;
  }
  useEffect(() => {
    if (userData) {
      setWhereConditionTasks([
        {
          key: "ownerId",
          operator: "==",
          value: userData.id,
        },
        {
          key: "status",
          operator: "in",
          value: [TaskStatuses.in_progress, TaskStatuses.in_review, TaskStatuses.returned],
        },
      ]);

      setPerformWhereConditionTasks([
        {
          key: "performerId",
          operator: "==",
          value: userData.id,
        },
        {
          key: "status",
          operator: "in",
          value: [TaskStatuses.in_progress, TaskStatuses.in_review, TaskStatuses.returned],
        },

      ]);
      setArchiveWhereConditionTasks([
        {
          key: "ownerId",
          operator: "==",
          value: userData.id,
        },
        {
          key: "status",
          operator: "in",
          value: [TaskStatuses.expired, TaskStatuses.declined, TaskStatuses.completed],
        },
      ]);

      const unsubscribeGroups = subscribeToCollection(
        `users/${userData.id}/groups`,
        [],
        setCachedGroups
      );

      return () => {
        unsubscribeGroups();
      };
    }


  }, [userData]);

  const deleteGroupOwner = async (groupId: any, isOwner: boolean) => {
    try {
      const users = await getUsersByGroupId(groupId)


      for (const user of users) {

        const userEmail = user.key;

        if (userEmail) {
          try {

            await deleteDoc(doc(db, `groups/${groupId}/users`, userEmail));
            await deleteDoc(doc(db, `users/${userEmail}/groups`, groupId));
          } catch (error) {
          }
        }
      }
      if (isOwner === true) {
        await deleteDoc(doc(db, `groups/${groupId}`));
      }
    } catch (error) {
      console.error("Ошибка при удалении группы:", error);
    } finally {
      setLoading(false)
    }
  }
  const addElementToTheFirebase = (path: string, element: any, docId?: string,) => {
    const collectionRef = collection(db, path);
    if (docId) {
      const docRef = doc(db, `${path}/${docId}`)
      return setDoc(docRef, element)
    }
    return addDoc(collectionRef, element);
  };
  const addTask = async (newTask: any) => {
    try {
      setLoading(true);
      newTask.ownerId = userData.id;
      newTask.ownerName = userData.nickname;
      await addElementToTheFirebase("tasks", newTask);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Ошибка при добавлении задачи:", error);
    } finally {
      setLoading(false)
    }
  };
  const addGroups = async (newGroup: any) => {
    try {
      const docId = uuidv4();

      await addElementToTheFirebase("groups", newGroup, docId);
      await addElementToTheFirebase(`groups/${docId}/users`, { nickname: userData.nickname }, userData.id);


      await addElementToTheFirebase(`users/${userData.id}/groups`, newGroup, docId);
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    } finally {
      setLoading(false)
    }
  };
  const addUser = async (newUser: any) => {
    try {
      if (selectedGroupId) {
        if (selectedUserId) {
          await addElementToTheFirebase(`groups/${selectedGroupId}/users`, newUser, selectedUserId);
          await addElementToTheFirebase(`users/${selectedUserId}/groups`, selectedGroup, selectedGroupId);
        }
      } else {
        console.error("Ошибка: selectedGroupId is null");
      }

    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    } finally {
      setLoading(false)
    }
  };

  const addUsersToGroup = async (selectedUsers: any[]) => {
    try {
      setLoading(true)
      if (selectedGroupId) {

        for (const user of selectedUsers) {
          const userId = user.id
          await addElementToTheFirebase(`groups/${selectedGroupId}/users`, { nickname: user.nickname }, userId);
          await addElementToTheFirebase(`users/${userId}/groups`, selectedGroup, selectedGroupId);

        }
      } else {
        console.error("Ошибка: selectedGroupId is null");
      }

    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    } finally {
      const newDate = new Date()
      setUserSync(newDate.getTime())
      setLoading(false)
    }

  };
  const removeUsersFromGroup = async (selectedUsers: any[]) => {
    try {
      setLoading(true)
      if (selectedGroupId) {

        for (const user of selectedUsers) {
          const userId = user.id
          await deleteDoc(doc(db, `groups/${selectedGroupId}/users`, userId));
          await deleteDoc(doc(db, `users/${userId}/groups`, selectedGroupId));
        }
      } else {
        console.error("Ошибка: selectedGroupId is null");
      }

    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
    finally {
      const newDate = new Date()
      setUserSync(newDate.getTime())
      setLoading(false)
    }
  };



  const [userDoc, setUserDoc] = useState<any>(null);
  useEffect(() => {
    if (user !== undefined) {
      // fetchGroupData();

      if (!user?.email) return;
      const docRef = doc(db, `users/${user?.email}`);
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
      return () => unsubscribe();
    }
  }, [user]);
  const filteredTasks = (groupId: string): any[] => {

    try {
      if (cachedTasks.length > 0) {
        const lst = cachedTasks.filter((task: any) => task.groupId === groupId).sort((a, b) =>
          new Date(a.endTime.toDate()).getTime() - new Date(b.endTime.toDate()).getTime()
        );
        return lst
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
        deleteGroupOwner,
        cachedArchiveRowTasks,
        cachedTasks,
        getUsers,
        addUser,
        selectedUserId,
        setSelectedUserId,
        cachedPerformTasks,
        concatenateTasks,
        cachedGroups,
        selectedGroupId,
        setSelectedGroupId,
        setSelectedGroup,
        selectedGroup,
        // refreshData,
        filteredTasks,
        userDoc,
        addTask,
        userData,
        addGroups,
        userSync,
        removeUsersFromGroup,
        refreshRequest,
        getUsersByGroupId,
        addUsersToGroup,
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
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext должен использоваться внутри DataProvider");
  }
  return context;
};
