import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data
const storeData = async (key: any, value: any) => {
try {
await AsyncStorage.setItem(key, value);
} catch (e) {
// saving error
console.error(e);
}
};

// Retrieve data
const getData = async (key: any) => {
try {
const value = await AsyncStorage.getItem(key);
if (value !== null) {
return value;
}
} catch (e) {
// reading error
console.error(e);
}
};

export { storeData, getData}