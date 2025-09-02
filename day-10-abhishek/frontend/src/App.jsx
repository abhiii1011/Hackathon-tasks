import React, { useEffect, useState, useMemo } from 'react';
import StudentForm from './components/StudentForm.jsx';
import StudentRow from './components/StudentRow.jsx';

const API_BASE = ''; // proxy via Vite dev server

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [q, setQ] = useState('');
  const [cohort, setCohort] = useState('');
  const [sort, setSort] = useState('name');

  async function load() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (q) params.append('q', q);
      if (cohort) params.append('cohort', cohort);
      if (sort) params.append('sort', sort);
      const res = await fetch(`${API_BASE}/api/students?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setStudents(data);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [q, cohort, sort]);

  async function create(form) {
    const res = await fetch('/api/students', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
    if (res.ok) {
      await load();
      return true;
    } else {
      const out = await res.json();
      alert(Object.values(out.errors||{error:out.error}).join('\n'));
      return false;
    }
  }

  async function update(id, data) {
    const res = await fetch(`/api/students/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
    if (res.ok) {
      const updated = await res.json();
      setStudents(s => s.map(st => st.id === id ? updated : st));
    } else {
      const out = await res.json();
      alert(Object.values(out.errors||{error:out.error}).join('\n'));
    }
  }

  async function remove(id) {
    if (!confirm('Delete this student?')) return;
    const res = await fetch(`/api/students/${id}`, { method:'DELETE' });
    if (res.ok) setStudents(s => s.filter(st => st.id !== id));
  }

  const cohorts = useMemo(() => Array.from(new Set(students.map(s => s.cohort))).sort(), [students]);

  return (
    <div className="app">
      <header>
        <h1>Day 10 Student Directory</h1>
        <p>Enhanced filters & sorting</p>
      </header>

      <section className="panel">
        <StudentForm onCreate={create} />
      </section>

      <section className="panel">
        <div className="filters">
          <input className="search" placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} />
          <select value={cohort} onChange={e => setCohort(e.target.value)}>
            <option value="">All Cohorts</option>
            {cohorts.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="name">Sort: Name</option>
            <option value="cohort">Sort: Cohort</option>
          </select>
          <button className="secondary" type="button" onClick={load}>Reload</button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{color:'#f87171'}}>{error}</p>}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Cohort</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading && students.length === 0 && (
                <tr><td colSpan={5} className="empty">No students.</td></tr>
              )}
              {students.map(s => (
                <StudentRow key={s.id} student={s} onUpdate={update} onDelete={remove} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer>
        In-memory API (port 4001). Data resets each server restart.
      </footer>
    </div>
  );
}
