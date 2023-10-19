import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface UserContextType {
  userId: number | null;
  username: string | null;
  token: string | null;
  login: (userID: number, username: string, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    const storedToken = sessionStorage.getItem('token');

    if (storedUserId && storedToken) {
      setUserId(parseInt(storedUserId, 10));
      setToken(storedToken);
    }

    setIsLoading(false);
  });

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    const storedToken = sessionStorage.getItem('token');

    if (storedUserId && storedToken) {
      setUserId(parseInt(storedUserId, 10));
      setToken(storedToken);
    }
  });

  const login = (newUserId: number, newUsername: string, newToken: string) => {
    setUserId(newUserId);
    setUsername(newUsername);
    setToken(newToken);

    sessionStorage.setItem('userId', newUserId.toString());
    sessionStorage.setItem('token', newToken);
  };

  const logout = () => {
    setUserId(null);
    setToken(null);

    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ userId, token, login, logout, isLoading }}>
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
