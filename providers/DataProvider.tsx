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
  isOwner:boolean,
  userDoc: any;
  userData: any,
  // refreshData: (entityType: DataType) => Promise<void>;
  filteredTasks: (groupId: string) => any[];
  addTask: (newTask: any) => Promise<void>;
  addGroups: (newTask: any) => Promise<void>;
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
  const [cachedRowTasks, setCachedRowTasks] = useState<any[]>([]);

  const [cachedUsers, setCachedUsers] = useState<any[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [cachedGroups, setCachedGroups] = useState<any[]>([]);

  const [userData, setUserData] = useState<any>(null);
  const [whereConditionTasks, setWhereConditionTasks] = useState<any[]>([]);
  const [whereConditionGroups, setWhereConditionGroups] = useState<any[]>([]);
  const { isLoading, setLoading } = useLoading()


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
        setCachedRowTasks
      );

      return () => {
        unsubscribeTasks();
      };
    }
  }, [userData, whereConditionTasks]);
  useEffect(() => {
    const sortedTasks = cachedRowTasks.sort((a, b) => new Date(a.startTime.toDate()).getTime() - new Date(b.startTime.toDate()).getTime())
    sortedTasks.forEach(
      (element:any)=>{
        setIsOwner(element.ownerId===userData.id)
       console.log(isOwner,'status')
       
      }
    );
    setCachedTasks(sortedTasks)
  }, [cachedRowTasks])
  useEffect(() => {
    if (userData) {
      //     setWhereConditionTasks([
      //       {
      //         key: "status",
      //         operator: "in",
      //         value: ["in_review", "declined-pending", "pending"],
      //       },
      //     ]);

      //     const ownerConditions = [
      //       { key: "ownerId", operator: "==", value: userData.id },
      //       { key: "status", operator: "in", value: ["in_review", "declined-pending", "pending"] },
      //     ];

      //     const performerConditions = [
      //       { key: "performerId", operator: "==", value: userData.id },
      //       { key: "status", operator: "in", value: ["in_review", "declined-pending", "pending"] },
      //     ];

      //     setLoading(true);
      //     const unsubscribeOwnerTasks = subscribeToCollection("tasks", ownerConditions, setCachedRowTasks);
      //     const unsubscribePerformerTasks = subscribeToCollection("tasks", performerConditions, setCachedRowTasks);

      //     const unsubscribeGroups = subscribeToCollection("groups", [], setCachedGroups);

      //     return () => {
      //       unsubscribeOwnerTasks();
      //       unsubscribePerformerTasks();
      //       unsubscribeGroups();
      //     };
      //   }
      // }, [userData]);
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

      const unsubscribeTasks = subscribeToCollection(
        "groups",
        [],
        setCachedGroups
      );

      return () => {
        unsubscribeTasks();
      };
    }


  }, [userData]);



  const addElementToTheFirebase = (path: string, element: any) => {
    const tasksCollectionRef = collection(db, path);
    return addDoc(tasksCollectionRef, element);
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
    }
  };
  const addGroups = async (newGroup: any) => {
    try {
      await addElementToTheFirebase("groups", newGroup);
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
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
        isOwner,
        cachedUsers,
        cachedTasks,
        cachedGroups,
        // refreshData,
        filteredTasks,
        userDoc,
        addTask,
        userData,
        addGroups,
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
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext должен использоваться внутри DataProvider");
  }
  return context;
};
