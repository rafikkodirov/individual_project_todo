import React, { createContext, useState, useContext, useEffect } from 'react';
import { getFilteredItemsV2 } from './services/firestore';
import { getData } from '@/hooks/storageUtils';
import { useAuth } from './authProvider';
import { db } from './services/firebaseConfig';
import {

    doc,
    onSnapshot,
 
} from "firebase/firestore";
interface DataContextType {
    cachedUsers: any[];
    cachedTasks: any[];
    cachedGroups: any[];
    userDoc: any;
    refreshData: (entityType: DataType) => Promise<void>;
    filteredTasks: (groupId: string) => any[];
    loading: boolean;
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

    useEffect(() => {
        const fetchUserData = async () => {
            const userDataStr = await getData("userData");
            const parsedUserData = JSON.parse(userDataStr);
            setUserData(parsedUserData);
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        if (userData) {
            setWhereConditionGroups([{
                key: "owner",
                operator: "==",
                value: userData.nickname,
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
            console.log(whereCondition, "whereCondition............................................123");
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
        <DataContext.Provider value={{ cachedUsers, cachedTasks, cachedGroups, refreshData, filteredTasks, userDoc, loading }}>
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
