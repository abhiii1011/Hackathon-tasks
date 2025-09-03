import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import FeedPage from './pages/FeedPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { useAuth } from './context/AuthContext.jsx';

function Nav() {
  const { user, logout } = useAuth();
  return (
    <nav>
      <Link to="/">Feed</Link>
      {user && <Link to={`/u/${user.username}`}>Profile</Link>}
      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>}
      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
}

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p style={{ padding: '1rem' }}>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Protected><FeedPage /></Protected>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/u/:username" element={<Protected><ProfilePage /></Protected>} />
      </Routes>
    </>
  );
}
