import React, { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import { Link } from 'react-router-dom';

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    try {
      const res = await api.get('/api/posts/feed');
      setPosts(res.posts);
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function createPost(e) {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      const res = await api.post('/api/posts', { content });
      setPosts(p => [res.post, ...p]);
      setContent('');
    } catch (e) { setError(e.message); }
  }

  async function like(id) {
    try {
      const res = await api.post(`/api/posts/${id}/like`);
      setPosts(p => p.map(post => post._id === id ? { ...post, likeCount: res.likeCount } : post));
    } catch (e) { /* ignore */ }
  }

  return (
    <div className="container">
      <h1>Feed</h1>
      <form onSubmit={createPost} style={{ display:'grid', gap:'.5rem', marginBottom:'1rem' }}>
        <textarea rows={3} placeholder="Share something..." value={content} onChange={e=>setContent(e.target.value)} />
        <button>Post</button>
      </form>
      {error && <p style={{ color:'salmon' }}>{error}</p>}
      {loading && <p>Loading...</p>}
      <ul style={{ listStyle:'none', padding:0, display:'grid', gap:'1rem' }}>
        {posts.map(p => (
          <li key={p._id} style={{ background:'#1e293b', padding:'1rem', borderRadius:8 }}>
            <p style={{ margin:'0 0 .5rem' }}><strong><Link to={`/u/${p.author?.username || 'user'}`}>{p.author?.username || 'user'}</Link></strong></p>
            <p style={{ whiteSpace:'pre-wrap', margin:'0 0 .5rem' }}>{p.content}</p>
            <button type="button" onClick={()=>like(p._id)}>Like ({p.likeCount})</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
