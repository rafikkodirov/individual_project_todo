import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  const userCredentials = await signInWithEmailAndPassword(auth, email, password);
  return userCredentials.user;
};

export const registerWithEmail = async (email: string, password: string): Promise<User> => {
  const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
  return userCredentials.user;
};

export const loginWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  console.log(auth, "Auth");
  console.log(provider, "provider");
  await signInWithPopup(auth, provider);
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};
