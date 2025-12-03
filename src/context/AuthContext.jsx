import React, { createContext, useState, useEffect } from 'react';
import { getProfile } from '../api/userApi';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const savedUser = localStorage.getItem('user');
  const [user, setUser] = useState(
    savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    getProfile()
      .then(u => {
        setUser(u);
        localStorage.setItem('user', JSON.stringify(u));
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser(null); // profile will load automatically
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
