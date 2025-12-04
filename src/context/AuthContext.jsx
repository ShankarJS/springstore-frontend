import React, { createContext, useState, useEffect } from 'react';
import { getProfile } from '../api/userApi';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const savedUser = localStorage.getItem('user');
  const savedExpiry = localStorage.getItem('token_expiry');

  const [user, setUser] = useState(
    savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiry = savedExpiry ? parseInt(savedExpiry) : null;

    // ❌ No token OR token expired → logout
    if (!token || (expiry && Date.now() > expiry)) {
      logout();
      setLoading(false);
      return;
    }

    // ✔ Load profile
    getProfile(token)
      .then(u => {
        setUser(u);
        localStorage.setItem('user', JSON.stringify(u));
      })
      .catch(() => {
        logout();
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (token, rememberMe) => {
    localStorage.setItem('token', token);

    const expiry = rememberMe
      ? Date.now() + 7 * 24 * 60 * 60 * 1000    // 7 days
      : Date.now() + 24 * 60 * 60 * 1000       // 1 day

    localStorage.setItem('token_expiry', expiry);

    setUser(null); // will reload via useEffect
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiry');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
