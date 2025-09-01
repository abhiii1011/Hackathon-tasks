import React, { useEffect, useState, useMemo } from 'react';
import StudentRow from './components/StudentRow.jsx';
import StudentForm from './components/StudentForm.jsx';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [cohortFilter, setCohortFilter] = useState('');

  async function fetchStudents() {
    try {
      setLoading(true);
      const res = await fetch('/api/students');
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setStudents(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchStudents(); }, []);

  async function addStudent(form) {
    const res = await fetch('/api/students', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
    });
    if (res.ok) {
      const created = await res.json();
      setStudents(s => [...s, created]);
    } else {
      const { errors } = await res.json();
      alert(errors.join('\n'));
    }
  }

  async function updateStudent(id, data) {
    const res = await fetch(`/api/students/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    if (res.ok) {
      const updated = await res.json();
      setStudents(s => s.map(st => st.id === id ? updated : st));
    } else {
      const { errors, error } = await res.json();
      alert(errors ? errors.join('\n') : error);
    }
  }

  async function deleteStudent(id) {
    if (!confirm('Delete this student?')) return;
    const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setStudents(s => s.filter(st => st.id !== id));
    }
  }

  const derived = useMemo(() => {
    return students.filter(s => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.email.toLowerCase().includes(search.toLowerCase())) return false;
      if (cohortFilter && s.cohort !== cohortFilter) return false;
      return true;
    }).sort((a,b) => a.name.localeCompare(b.name));
  }, [students, search, cohortFilter]);

  const cohorts = useMemo(() => Array.from(new Set(students.map(s => s.cohort))).sort(), [students]);

  return (
    <div className="app">
      <header>
        <h1>Student Directory</h1>
        <p>Minimal full-stack demo (in-memory API)</p>
      </header>

      <div className="card">
        <StudentForm onCreate={addStudent} />
      </div>

      <div className="card">
        <div className="filters">
          <input
            placeholder="Search name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select value={cohortFilter} onChange={e => setCohortFilter(e.target.value)}>
            <option value="">All Cohorts</option>
            {cohorts.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button className="secondary" onClick={fetchStudents}>Reload</button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{color:'crimson'}}>{error}</p>}
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
              {derived.length === 0 && !loading && (
                <tr><td colSpan={5} className="empty">No students match filters.</td></tr>
              )}
              {derived.map(s => (
                <StudentRow key={s.id} student={s} onUpdate={updateStudent} onDelete={deleteStudent} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer>
        Data resets on server restart. Consider adding persistence as a next step.
      </footer>
    </div>
  );
}
