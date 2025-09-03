import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ emailOrUsername: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.emailOrUsername, form.password);
      nav('/');
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display:'grid', gap:'0.8rem', maxWidth:400 }}>
        <input placeholder="Email or Username" value={form.emailOrUsername} onChange={e=>setForm(f=>({...f,emailOrUsername:e.target.value}))} required />
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} required />
        {error && <p style={{ color:'salmon' }}>{error}</p>}
        <button disabled={loading}>{loading?'...':'Login'}</button>
        <p>Need an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}
