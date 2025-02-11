import { createContext, useContext, useState } from 'react';

// Пример контекста для хранения состояния авторизации
const AuthContext = createContext({
  isAuthenticated: false,
  setAuthenticated: (status: boolean) => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState(false); // Логика аутентификации

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
