import React, { createContext, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setUser, logout as logoutAction } from '../redux/slices/authSlice';

interface AuthContextType {
  isLoggedIn: boolean;
  user: { name: string; email: string; role: string } | null;
  login: (email: string, password: string) => Promise<boolean>; // Keep for compatibility if needed, but LoginPage uses mutation now
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated: isLoggedIn } = useAppSelector((state) => state.auth);

  // Note: login is now handled by useLoginMutation in LoginPage.tsx
  // This login function is kept for backward compatibility if other components use it
  const login = async (email: string, password: string): Promise<boolean> => {
    // This could be implemented to call the mutation but it's better to use the hook in components
    console.warn("AuthContext.login is deprecated. Use useLoginMutation hook instead.");
    return false;
  };

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("token");
    localStorage.removeItem("buan_logged_in");
    localStorage.removeItem("buan_user_data");
    localStorage.removeItem("role");
    
    // Force a redirect and reload to clear state and re-evaluate auth
    window.location.href = '/login';
  };

  const storedUser = localStorage.getItem('buan_user_data');
  const initialUser = user || (storedUser ? JSON.parse(storedUser) : null);
  const isAuthenticated = isLoggedIn || localStorage.getItem('token') !== null;

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn: isAuthenticated, 
      user: initialUser, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
