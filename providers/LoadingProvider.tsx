import { Loading02Icon } from '@/components/Loading02Icon';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
const styles = Platform.OS === 'android' 
  ? require('../styles/styles.android').default 
  : require('../styles/styles.android').default; 

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
 
export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      <View style={{ flex: 1 }}>
        {children}
        {isLoading && (
          <View style={styles.overlay}>
            <Loading02Icon />
          </View>
        )}
      </View>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

 