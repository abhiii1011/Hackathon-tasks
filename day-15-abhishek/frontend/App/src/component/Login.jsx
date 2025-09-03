import React, { useState } from "react";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      login(data.token);
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
      <div style={{ padding: '1rem', maxWidth: '24rem', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ border: '1px solid #ccc', padding: '0.5rem', width: '100%', marginBottom: '0.5rem', boxSizing: 'border-box' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ border: '1px solid #ccc', padding: '0.5rem', width: '100%', marginBottom: '0.5rem', boxSizing: 'border-box' }}
          />
          <button 
            style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '0.5rem 1rem', borderRadius: '0.375rem', width: '100%', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginBottom: '0.5rem' }}
          >
            Login
          </button>
          {error && <p style={{ color: '#ef4444', marginTop: '0.5rem' }}>{error}</p>}
        </form>
      </div>
  );
};

export default Login;
