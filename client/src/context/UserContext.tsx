import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  FC,
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

/**
 * UserProvider setups the context for user-related information
 * for the whole page
 *
 * @param {UserProviderProps} props - Contains: userId, username token and if isLoading
 * @property {React.ReactNode} props.children - The child elements to be wrapped by the context provider.
 *
 * @returns {JSX.Element} The user context
 */
export const UserProvider: FC<UserProviderProps> = ({
  children,
}: UserProviderProps): JSX.Element => {
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    const storedUsername = sessionStorage.getItem('username');
    const storedToken = sessionStorage.getItem('token');

    if (storedUserId && storedToken) {
      setUserId(parseInt(storedUserId, 10));
      setUsername(storedUsername);
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
    sessionStorage.setItem('username', newUsername.toString());
    sessionStorage.setItem('token', newToken);
  };

  const logout = () => {
    setUserId(null);
    setUsername(null);
    setToken(null);

    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  };

  return (
    <UserContext.Provider
      value={{ userId, username, token, login, logout, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

/**
 * Custom hook for accessing the user information through the userContext
 *
 * @throws {Error} Throws an error if used outside the context of UserProvider
 *
 * @returns {UserContextType} The user context value
 */
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within UserProvider');
  }

  return context;
};
