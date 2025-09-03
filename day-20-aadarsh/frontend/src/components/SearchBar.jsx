import React, { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('');
  function submit(e) {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value.trim());
  }
  return (
    <form onSubmit={submit} className="search-bar">
      <input
        placeholder="Search city..."
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={loading}
      />
      <button disabled={loading || !value.trim()}>{loading ? '...' : 'Go'}</button>
    </form>
  );
}
