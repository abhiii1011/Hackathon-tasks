import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function RegisterPage() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      nav('/');
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  }

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} style={{ display:'grid', gap:'0.8rem', maxWidth:400 }}>
        <input placeholder="Username" value={form.username} onChange={e=>setForm(f=>({...f,username:e.target.value}))} required />
        <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required />
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} required />
        {error && <p style={{ color:'salmon' }}>{error}</p>}
        <button disabled={loading}>{loading?'...':'Create Account'}</button>
        <p>Have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
