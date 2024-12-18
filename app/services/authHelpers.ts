// authHelpers.ts
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Register with Email/Password
export const registerWithEmail = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

// Login with Email/Password
export const loginWithEmail = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logout = async () => {
  await signOut(auth);
};
