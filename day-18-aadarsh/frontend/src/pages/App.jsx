import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext.jsx';
import NavBar from '../components/NavBar.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Boards from './Boards.jsx';
import Board from './Board.jsx';

const Private = ({ children }) => {
  const { user, loading } = useAuth();
  if(loading) return <p style={{ padding:20 }}>Loading...</p>;
  if(!user) return <Navigate to="/login" />;
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/boards" element={<Private><Boards /></Private>} />
        <Route path="/boards/:id" element={<Private><Board /></Private>} />
        <Route path="*" element={<Navigate to="/boards" />} />
      </Routes>
    </AuthProvider>
  );
}
