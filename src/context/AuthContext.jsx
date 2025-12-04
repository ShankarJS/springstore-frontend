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
    const savedExpiry = localStorage.getItem('token_expiry');
    const expiry = savedExpiry ? parseInt(savedExpiry) : null;

    if (!token || (expiry && Date.now() > expiry)) {
      logout();
      setLoading(false);
      return;
    }

    // load profile once on mount if token exists
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

  // make login asynchronous and load profile immediately
  const login = async (token, rememberMe = false) => {
    localStorage.setItem('token', token);

    const expiry = rememberMe
      ? Date.now() + 7 * 24 * 60 * 60 * 1000    // 7 days
      : Date.now() + 24 * 60 * 60 * 1000;      // 1 day

    localStorage.setItem('token_expiry', expiry);

    // fetch profile immediately and set user in context
    try {
      const profile = await getProfile(token);
      setUser(profile);
      localStorage.setItem('user', JSON.stringify(profile));
      return profile;
    } catch (err) {
      // if profile fetch fails, clear token & user
      localStorage.removeItem('token');
      localStorage.removeItem('token_expiry');
      localStorage.removeItem('user');
      setUser(null);
      throw err;
    }
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
