
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// User details returned by the login API
export interface User {
  id: string;
  role: string;

  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;

  // Zone details (available for zone-related users)
  zoneId?: string;
  zoneName?: string;

  meterCount: number;
  notificationPrefs: string;
  joinedOn: string;

  // Not every role has an avatar
  avatarUrl?: string;
}

// What the Context will provide to other components
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider makes user details available throughout the application
export const UserProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUserState] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Update React state and LocalStorage together
  const setUser = (newUser: User | null) => {
    setUserState(newUser);

    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user details
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
};
