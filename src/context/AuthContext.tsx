import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types/auth';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  loginAsDemo: (role: UserRole) => void;
  loginCustom: (name: string, email: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = authService.getCurrentUser();
    if (session) setUser(session);
  }, []);

  const loginAsDemo = (role: UserRole) => {
    const loggedUser = authService.loginAsDemo(role);
    setUser(loggedUser);
  };

  const loginCustom = (name: string, email: string, role: UserRole) => {
    const loggedUser = authService.loginCustom(name, email, role);
    setUser(loggedUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    role: user ? user.role : 'CLIENTE',
    loginAsDemo,
    loginCustom,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
