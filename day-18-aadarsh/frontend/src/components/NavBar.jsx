import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function NavBar() {
  const { user, logout } = useAuth();
  return (
    <div className="nav">
      <Link to="/boards"><strong>TrelloLike</strong></Link>
      <div className="header-spacer" />
      {user ? (
        <>
          <span style={{ fontSize:14 }}>{user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}
