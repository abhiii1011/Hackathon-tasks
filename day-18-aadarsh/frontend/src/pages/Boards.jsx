import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Boards() {
  const { authHeaders } = useAuth();
  const [boards, setBoards] = useState([]);
  const [name, setName] = useState('');

  const load = () => axios.get(API + '/boards', { headers: authHeaders }).then(r => setBoards(r.data));
  useEffect(() => { load(); }, []);

  const create = async e => {
    e.preventDefault();
    await axios.post(API + '/boards', { name }, { headers: authHeaders });
    setName('');
    load();
  };

  return (
    <div style={{ padding:20 }}>
      <h2>Your Boards</h2>
      <form onSubmit={create} className="form-inline" style={{ marginBottom:16 }}>
        <input placeholder="New board name" value={name} onChange={e=>setName(e.target.value)} required />
        <button className="primary">Create</button>
      </form>
      <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
        {boards.map(b => (
          <Link key={b._id} to={`/boards/${b._id}`} style={{ background:'#1e293b', padding:'1rem', borderRadius:8, width:180 }}>
            <strong>{b.name}</strong>
            <div style={{ fontSize:12, marginTop:4 }}>Updated {new Date(b.updatedAt).toLocaleDateString()}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
