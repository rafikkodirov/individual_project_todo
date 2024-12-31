import React, { createContext, useState, useContext, useEffect } from 'react';
import { getFilteredItemsV2 } from './services/firestore';
import { getData } from '@/hooks/storageUtils';

interface DataContextType {
    cachedUsers: any[];
    cachedTasks: any[];
    cachedGroups: any[];
    refreshData: () => Promise<void>;
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
        }
    }, [userData]);
    const fetchData = async () => {
        setLoading(true);
        try {
            // Загрузка пользователей
            const users = await getFilteredItemsV2('users', []);
            setCachedUsers(users);

            // Загрузка задач
            const tasks = await getFilteredItemsV2('tasks', whereCondition);
            setCachedTasks(tasks);

            // Загрузка групп
            const groups = await getFilteredItemsV2('groups',[]);
            setCachedGroups(groups);

        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        } finally {
            setLoading(false);
        }
    };

    const refreshData = async () => {
        await fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ cachedUsers, cachedTasks, cachedGroups, refreshData, loading }}>
            {children}
        </DataContext.Provider>
    );
};

// Хук для доступа к данным
export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext должен использоваться внутри DataProvider');
    }
    return context;
};
