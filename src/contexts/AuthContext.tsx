import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  user: { name: string; email: string; role: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('buan_logged_in') === 'true';
  });
  const [user, setUser] = useState<AuthContextType['user']>(() => {
    const stored = localStorage.getItem('buan_user_data');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(r => setTimeout(r, 800));
    if (email === 'admin@buanenterprise.com' && password === 'admin123') {
      const u = { name: 'Mr. Admin', email, role: 'admin' };
      setIsLoggedIn(true);
      setUser(u);
      localStorage.setItem('buan_logged_in', 'true');
      localStorage.setItem('buan_user_data', JSON.stringify(u));
      return true;
    }
    if (email === 'branch@buanenterprise.com' && password === 'branch123') {
      const u = { name: 'Branch', email, role: 'branch' };
      setIsLoggedIn(true);
      setUser(u);
      localStorage.setItem('buan_logged_in', 'true');
      localStorage.setItem('buan_user_data', JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('buan_logged_in');
    localStorage.removeItem('buan_user_data');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
