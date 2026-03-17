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
    return localStorage.getItem('buan_enterprise') === 'true';
  });
  const [user, setUser] = useState<AuthContextType['user']>(() => {
    const stored = localStorage.getItem('buan_enterprise');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(r => setTimeout(r, 800));
    if (email === 'admin@buanenterprise.com' && password === 'admin123') {
      const u = { name: 'Mr. Admin', email, role: 'Super Admin' };
      setIsLoggedIn(true);
      setUser(u);
      localStorage.setItem('buan_enterprise', 'true');
      localStorage.setItem('buan_enterprise', JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('buan_enterprise');
    localStorage.removeItem('buan_enterprise');
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
