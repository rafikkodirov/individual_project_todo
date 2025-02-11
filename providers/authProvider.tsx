import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithCustomToken, User } from "firebase/auth";
import { auth } from "@/app/services/firebaseConfig";
import { SecureStore } from "@/stores/global.store";
import { loginWithEmail } from "@/app/services/authUtils";
import { FirebaseError } from "firebase/app";

export interface AppUser {
  email: string;
  password: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User | null>;
  reLogin: boolean;
}

const AuthContext = createContext<AuthContextProps>({ user: null, loading: true, signIn: async () => null , reLogin: false});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [reLogin, setReLogin] = useState(false);

  // Check for saved user data and refresh Firebase user
  const refreshFirebaseUser = () => {
    try {
      const savedUser = SecureStore.get<AppUser>("USER");  
      console.log(savedUser,'savedUser///d/'); 
      if (savedUser) {
        signIn(savedUser.email, savedUser.password);
      }
    } catch (error) {
      console.error("Error refreshing Firebase user:", error); 
      setReLogin(true);
    }
  };
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
    console.log("onAuthStateChanged ................................. ", user?.email);
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);


  useEffect(() => {
    // On app load, check for saved user data and refresh
    const initializeUser = async () => {
      setLoading(true);
      const refreshedUser = await refreshFirebaseUser(); 
    };
    initializeUser();
  }, []);

  const signIn = async (email: string, password: string): Promise<User | null> => {
    console.log(email, password, "email, password...........................");
    
    setReLogin(false);
    try {
      const user = await loginWithEmail(email, password);
      console.log(email, password, "email, password ........................... success!!!");
      setUser(user);
      return user;
    } catch (error: any) {
      const err = error as FirebaseError;
      console.error("Sign-in error:", err.stack);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, reLogin}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);