import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthCtx = createContext();
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    if(token) {
      axios.get(API + '/auth/me', { headers: { Authorization: 'Bearer ' + token }})
        .then(r => setUser(r.data.user))
        .catch(() => { setToken(null); localStorage.removeItem('token'); })
        .finally(() => setLoading(false));
    }
  }, [token]);

  const login = async (email, password) => {
    const { data } = await axios.post(API + '/auth/login', { email, password });
    setToken(data.token); localStorage.setItem('token', data.token); setUser(data.user);
  };
  const register = async (name, email, password) => {
    const { data } = await axios.post(API + '/auth/register', { name, email, password });
    setToken(data.token); localStorage.setItem('token', data.token); setUser(data.user);
  };
  const logout = () => { setToken(null); localStorage.removeItem('token'); setUser(null); };

  const value = { user, token, login, register, logout, loading, authHeaders: token ? { Authorization: 'Bearer ' + token } : {} };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};

export const useAuth = () => useContext(AuthCtx);
