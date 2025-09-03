import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try { await register(name, email, password); navigate('/boards'); }
    catch(e){ setError(e.response?.data?.message || 'Register failed'); }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <label>Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} required />
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        <label>Password</label>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        {error && <div className="error">{error}</div>}
        <button className="primary" style={{ marginTop:12, width:'100%' }}>Create account</button>
      </form>
      <p style={{ fontSize:12, marginTop:16 }}>Have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
