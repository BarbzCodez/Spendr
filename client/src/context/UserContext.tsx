import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  userId: number | null;
  username: string | null;
  token: string | null;
  login: (userID: number, username: string, token: string) => void;
  logout: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const [token, setToken] = useState<string | null>(null);

  const login = (newUserId: number, newUsername: string, newToken: string) => {
    setUserId(newUserId);
    setUsername(newUsername);
    setToken(newToken);
  };

  const logout = () => {
    setUserId(null);
    setToken(null);
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        username,
        token,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within UserProvider');
  }

  return context;
};
