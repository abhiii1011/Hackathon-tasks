import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client.js';

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/api/auth/me');
        setUser(res.user);
      } catch (_) { /* not logged in */ }
      finally { setLoading(false); }
    })();
  }, []);

  async function login(emailOrUsername, password) {
    const res = await api.post('/api/auth/login', { emailOrUsername, password });
    setUser(res.user);
  }
  async function register(username, email, password) {
    const res = await api.post('/api/auth/register', { username, email, password });
    setUser(res.user);
  }
  async function logout() {
    await api.post('/api/auth/logout');
    setUser(null);
  }

  return <AuthCtx.Provider value={{ user, loading, login, register, logout }}>{children}</AuthCtx.Provider>;
}

export function useAuth() { return useContext(AuthCtx); }
