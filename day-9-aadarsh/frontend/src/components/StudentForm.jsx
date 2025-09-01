import React, { useState } from 'react';

export default function StudentForm({ onCreate }) {
  const [form, setForm] = useState({ name: '', email: '', cohort: '' });

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.cohort.trim()) {
      alert('All fields required');
      return;
    }
    await onCreate({ ...form });
    setForm({ name: '', email: '', cohort: '' });
  }

  return (
    <form onSubmit={submit} className="row">
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => update('name', e.target.value)}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={e => update('email', e.target.value)}
        type="email"
      />
      <input
        placeholder="Cohort (YYYY)"
        value={form.cohort}
        onChange={e => update('cohort', e.target.value)}
        pattern="[0-9]{4}"
        title="Year like 2025"
      />
      <button type="submit">Add Student</button>
    </form>
  );
}
