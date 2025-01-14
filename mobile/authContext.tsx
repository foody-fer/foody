import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the AuthContext type
type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props for AuthProvider
type AuthProviderProps = {
  children: ReactNode; // Allow children of any React type
};

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
