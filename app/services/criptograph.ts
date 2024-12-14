
import CryptoJS from 'crypto-js';
import Constants from 'expo-constants';
// import Random from 'expo-random';
import * as Crypto from 'expo-crypto';

// Utility function to generate a random salt
async function generateRandomSalt(): Promise<string> {
  const randomBytes = await Crypto.getRandomBytes(16) // Generate 16 random bytes
  return Array.from(randomBytes, byte => ('0' + byte.toString(16)).slice(-2)).join('');
}

// Utility function to generate a secure key
export async function generateKeyFromPassword(password: string, salt: string): Promise<string> {
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32, // 256-bit key
    iterations: 1000, // Increase iterations for better security
  }).toString();
  return key;
}

// Encrypt function
export async function encryptStringAES(plainText: string, key: string): Promise<string> {
  try {
    const encrypted = CryptoJS.DES.encrypt(plainText, key).toString();
    // console.log('Encrypted Data: ', encrypted);
    return encrypted;
  } catch (error) {
    console.error('Encryption error: ', error);
    return '';
  }
}

export async function encryptString(plainText: string): Promise<string> {
  return encryptStringAES(plainText, Constants.expoConfig?.extra?.encryptionKey)
}



// Decrypt function
export async function decryptStringAES(encryptedText: string, key: string): Promise<string> {
  try {
    const bytes = CryptoJS.DES.decrypt(encryptedText, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    // console.log('Decrypted Data: ', decrypted);
    return decrypted;
  } catch (error) {
    console.error('Decryption error: ', error);
    return '';
  }
}

export async function decryptString(plainText: string): Promise<string> {
  return decryptStringAES(plainText, Constants.expoConfig?.extra?.encryptionKey)
}


// (async () => {
//   try {  

//   const plainText = 'https://www.banki.ru/investment/shares/russian_shares/sphere-finance/';
//   const encrypted = await encryptString(plainText); 
//   const decrypted = await decryptString(encrypted);   
// } catch (error) {
//   console.log(error);
      
// }

// })();

export default {
  encryptString,
  decryptString
}