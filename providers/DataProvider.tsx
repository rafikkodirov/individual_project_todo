import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './authProvider';
import {

    collection,
    doc,
    onSnapshot,
    query,

} from "firebase/firestore";
import { getFilteredItemsV2 } from '@/app/services/firestore';
import { db } from '@/app/services/firebaseConfig';
import { AsyncStore, SecureStore } from '@/stores/global.store';
interface DataContextType {
    cachedUsers: any[];
    cachedTasks: any[];
    cachedGroups: any[];
    userDoc: any;
    refreshData: (entityType: DataType) => Promise<void>;
    filteredTasks: (groupId: string) => any[];
    loading: boolean;
    // addTask: (newTask: any) => Promise<void>;
    // updateTask: (task: any) => Promise<void>;
    // deleteTask: (task: any) => Promise<void>;
}


export interface FSUserInfo {
    id: string;
    isActive: boolean;
    nickname: string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cachedUsers, setCachedUsers] = useState<any[]>([]);
    const [cachedTasks, setCachedTasks] = useState<any[]>([]);
    const [cachedGroups, setCachedGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const [userData, setUserData] = useState<any>(null);
    const [whereCondition, setWhereCondition] = useState<any[]>([]);
    const [whereConditionGroups, setWhereConditionGroups] = useState<any[]>([]);

    const { user } = useAuth()
    const subscribeToCollection = (
        collectionPath: string,
        conditions: any[],
        onUpdate: (data: any[]) => void
      ) => {
        const q = query(collection(db, collectionPath), ...conditions);
        return onSnapshot(
          q,
          (querySnapshot) => {
            const data: any[] = [];
            querySnapshot.forEach((doc) => {
              data.push({ key: doc.id, ...doc.data() });
            });
            onUpdate(data);
          },
          (error: any) => {
            console.error(`Ошибка при подписке на ${collectionPath}:`, error);
          }
        );
      };
      
    useEffect(() => {
        const fetchUserData = async () => {
            const savedUser = await AsyncStore.get<FSUserInfo>("USER_DATA");
            setUserData(savedUser);
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        if (userData) {
            setWhereConditionGroups([{
                key: "owner",
                operator: "==",
                value: userData.email,
            }]);
        }
    }, [userData]);

    useEffect(() => {
        if (userData) {
            setWhereCondition([{
                key: "ownerId",
                operator: "==",
                value: userData.id,
            }]);
            console.log(userData.id, "userData.id............................................123");
        }
    }, [userData]);

    const [userDoc, setUserDoc] = useState<any>(null);
    useEffect(() => {
        if (user !== undefined) {
            fetchUserData();
            fetchGroupData();
            fetchActiveTasksData();

            if (!user?.email) return;
            const docRef = doc(db, `users/${user?.email}`);
            // Start observing the document
            const unsubscribe = onSnapshot(
                docRef,
                (snapshot) => {
                    if (snapshot.exists()) {
                        setUserDoc(snapshot.data());
                    } else {
                        console.warn('Document does not exist');
                        setUserDoc(null);
                    }
                    setLoading(false);
                },
                (error) => {
                    console.error('Error observing document:', error);
                    setLoading(false);
                }
            );

            // Clean up listener on unmount
            return () => unsubscribe();
        }
    }, [user]);


    const fetchUserData = async () => {
        setLoading(true);
        try {
            const users = await getFilteredItemsV2('users', []);
            setCachedUsers(users);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchGroupData = async () => {
        setLoading(true);
        try {
            const groups = await getFilteredItemsV2('groups', []);
            setCachedGroups(groups);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchActiveTasksData = async () => {
        setLoading(true);
        try {
            const tasks = await getFilteredItemsV2('tasks', whereCondition);
            setCachedTasks(tasks);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        } finally {
            setLoading(false);
        }
    };

    const refreshData = async (entityType: DataType) => {
        switch (entityType) {
            case DataType.Users:
                await fetchUserData();
                break;
            case DataType.Tasks:
                await fetchActiveTasksData()
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
            return []
        } catch (error) {
            return []
        }
    }


    return (
        <DataContext.Provider
            value={{
                cachedUsers,
                cachedTasks,
                cachedGroups,
                refreshData,
                filteredTasks,
                userDoc,
                loading,
                // addTask,
                // updateTask,
                // deleteTask,
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
        throw new Error('useDataContext должен использоваться внутри DataProvider');
    }
    return context;
};
