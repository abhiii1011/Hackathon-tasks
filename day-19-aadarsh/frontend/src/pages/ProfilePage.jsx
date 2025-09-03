import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client.js';

export default function ProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/users/${username}`);
        setProfile(res.user);
      } catch (e) { setError(e.message); } finally { setLoading(false); }
    })();
  }, [username]);

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error) return <div className="container"><p style={{ color:'salmon' }}>{error}</p></div>;
  if (!profile) return <div className="container"><p>Not found</p></div>;

  return (
    <div className="container">
      <h1>@{profile.username}</h1>
      {profile.bio && <p>{profile.bio}</p>}
      <p>{profile.followers?.length || 0} followers • {profile.following?.length || 0} following</p>
    </div>
  );
}
