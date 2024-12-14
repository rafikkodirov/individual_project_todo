import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

const firebaseConfig = {
  // apiKey: Constants.manifest?.extra?.firebaseApiKey || process.env.FIREBASE_API_KEY,
  // authDomain: Constants.manifest?.extra?.firebaseAuthDomain || process.env.FIREBASE_AUTH_DOMAIN,
  // projectId: Constants.manifest?.extra?.firebaseProjectId || process.env.FIREBASE_PROJECT_ID,
  // storageBucket: Constants.manifest?.extra?.firebaseStorageBucket || process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId || process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: Constants.manifest?.extra?.firebaseAppId || process.env.FIREBASE_APP_ID
  apiKey: "apiKey-AUq-P8IX51TNu0jsCY8",
  authDomain: "917777029925-9okonf7qgvrpgaog630fipq6l4j6jvld.apps.googleusercontent.com",
  projectId: "my-poster-b3932",
  storageBucket: "my-poster-b3932.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "1:917777029925:android:1c7333bbf877ee2e0958cc"
}; 
// console.log(firebaseConfig, "Firebase config......................");


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
