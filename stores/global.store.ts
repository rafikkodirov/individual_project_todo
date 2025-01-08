import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStorage from 'expo-secure-store';

const keys = {
  secure: {
    USER: 'user',
    TOKEN: 'token',  
  },
  async: {
    THEME: 'theme', 
    USER_DATA: 'userData',
  },
};

const secureStoreDefaultOptions: SecureStorage.SecureStoreOptions = {
  keychainAccessible: SecureStorage.AFTER_FIRST_UNLOCK,
};

export const SecureStore = {
  save: <T>(key: keyof typeof keys.secure, data: T) => {
    SecureStorage.setItem(
      keys.secure[key],
      JSON.stringify(data),
      secureStoreDefaultOptions
    );
  },
  get: <T>(key: keyof typeof keys.secure): T | null => {
    const dataString = SecureStorage.getItem(
      keys.secure[key],
      secureStoreDefaultOptions
    );

    if (dataString) {
      try {
        const parsedData = JSON.parse(dataString) as T;
        return parsedData;
      } catch (error) {
        return dataString as unknown as T;
      }
    }

    return null;
  },
  delete: async (keysToDelete: (keyof typeof keys.secure)[]) => {
    try {
      for (const key of keysToDelete) {
        await SecureStorage.deleteItemAsync(
          keys.secure[key],
          secureStoreDefaultOptions
        );
      }
    } catch (error) {
      console.error('Error removing items from SecureStore', error);
    }
  },
};

export const AsyncStore = {
  save: async <T>(
    key: keyof typeof keys.async,
    data: T | ((prevState: T) => T)
  ) => {
    try {
      const prevStateString = await AsyncStorage.getItem(keys.async[key]);
      let prevState: T | null = null;

      if (prevStateString) {
        try {
          prevState = JSON.parse(prevStateString) as T;
        } catch (error) {
          console.error('Error parsing previous state', error);
        }
      }

      const newData =
        typeof data === 'function'
          ? (data as (prevState: T | null) => T | null)(prevState)
          : data;
      if (JSON.stringify(newData)) {
        await AsyncStorage.setItem(keys.async[key], JSON.stringify(newData));
      }
    } catch (error) {
      console.error('Error saving to AsyncStorage', error);
    }
  },
  get: async <T>(key: keyof typeof keys.async): Promise<T | null> => {
    try {
      const dataString = await AsyncStorage.getItem(keys.async[key]);
      if (dataString) {
        try {
          const parsedData = JSON.parse(dataString) as T;
          return parsedData;
        } catch (error) {
          return dataString as unknown as T;
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting from AsyncStorage', error);
      return null;
    }
  },
  delete: async (keysToDelete: (keyof typeof keys.async)[]) => {
    try {
      for (const key of keysToDelete) {
        await AsyncStorage.removeItem(keys.async[key]);
      }
    } catch (error) {
      console.error('Error removing items from AsyncStorage', error);
    }
  },
};
