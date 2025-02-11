import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import { useAuth } from "./authProvider";
import {
  addDoc,
  and,
  collection,
  doc, 
  onSnapshot,
  or,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getFilteredItemsV2, updateElementToTheFirebase } from "@/app/services/firestore";
import { db } from "@/app/services/firebaseConfig";
import { AsyncStore, SecureStore } from "@/stores/global.store";
import { useLoading } from "./LoadingProvider";
import { TaskStatuses } from "@/Common/TaskStatuses";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

interface DataContextType {
  cachedUsers: any[];
  cachedTasks: any[];
  cachedPerformTasks: any[];
  concatenateTasks:  any[];
  cachedGroups: any[]; 
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

  const [cachedPerformTasks, setCachedPerformTasks] = useState<any[]>([]);
  const [cachedPerformRowTasks, setCachedPerformRowTasks] = useState<any[]>([]);

  const [concatenateTasks, setConcatenateTasks] = useState<any[]>([]);
  

  const [cachedUsers, setCachedUsers] = useState<any[]>([]); 
  const [cachedGroups, setCachedGroups] = useState<any[]>([]);

  const [userData, setUserData] = useState<any>(null);
  const [whereConditionTasks, setWhereConditionTasks] = useState<any[]>([]);
  const [wherePerformConditionTasks, setPerformWhereConditionTasks] = useState<any[]>([]);
  const [whereConditionGroups, setWhereConditionGroups] = useState<any[]>([]);
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
    //console.log("refreshRequest ............... 4");
    if (userData && userData.id && whereConditionTasks.length > 0) {
      // console.log(whereConditionTasks, "whereConditionTasks...............");

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
    // console.log("refreshRequest ............... 4");
    if (userData && userData.id && wherePerformConditionTasks.length > 0) {
      // console.log(wherePerformConditionTasks, "whereConditionTasks...............");

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
    const sortedTasks = cachedRowTasks.sort((a, b) => new Date(a.startTime.toDate()).getTime() - new Date(b.startTime.toDate()).getTime())
    sortedTasks.forEach(
      (element:any)=>{
        element.isOwner = element.ownerId===userData.id 
       
      }
    );
    setCachedTasks(sortedTasks)
  }, [cachedRowTasks])


  useEffect(() => {
    const sortedTasks = cachedPerformRowTasks.sort((a, b) => new Date(a.startTime.toDate()).getTime() - new Date(b.startTime.toDate()).getTime())
    sortedTasks.forEach(
      (element:any)=>{
        element.isOwner = element.ownerId===userData.id
      }
    );
    setCachedPerformTasks(sortedTasks)
  }, [cachedPerformRowTasks])


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
          value: [TaskStatuses.pending, TaskStatuses.in_review, TaskStatuses.declined_pending],
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
          value: [TaskStatuses.pending, TaskStatuses.in_review, TaskStatuses.declined_pending],
        },
      ]);

      const unsubscribeTasks = subscribeToCollection(
        `users/${userData.id}/groups`,
        [],
        setCachedGroups
      );

      return () => {
        unsubscribeTasks();
      };
    }


  }, [userData]);



  const addElementToTheFirebase = (path: string, element: any, docId?: string, ) => {
    const collectionRef = collection(db, path);
    if(docId) {
      console.log(docId, "docId ...............");      
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
    }
  };
  const addGroups = async (newGroup: any) => {
    try {
      const docId = uuidv4();
      await addElementToTheFirebase("groups", newGroup, docId);
      await addElementToTheFirebase(`users/${userData.id}/groups`, newGroup, docId);
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
        const lst = cachedTasks.filter((task: any) => task.groupId === groupId); 
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
        cachedTasks,
        cachedPerformTasks,
        concatenateTasks,
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
