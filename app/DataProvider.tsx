import React, { createContext, useState, useContext, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './services/firebaseConfig';
import { getFilteredItemsV2 } from './services/firestore';

interface DataContextType {
    cachedUsers: any[]; // Replace `any` with the type of your data items
    refreshData: () => Promise<void>;
    loading: boolean;
  }
// Initialize the context with a default value or `undefined`.
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cachedUsers, setCachedUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const fetchedItems: any[] = await getFilteredItemsV2("user", []); 
            setCachedUsers(fetchedItems);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Refresh data function
    const refreshData = async () => {
        console.log('Refreshing data...');
        await fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ cachedUsers, refreshData, loading }}>
            {children}
        </DataContext.Provider>
    );
};

// Hook to use the data context
export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
      throw new Error('useDataContext must be used within a DataProvider');
    }
    return context; // Now guaranteed to be non-undefined
  };
