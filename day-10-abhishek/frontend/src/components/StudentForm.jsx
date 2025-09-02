import React, { useState } from 'react';

export default function StudentForm({ onCreate }) {
  const [form, setForm] = useState({ name: '', email: '', cohort: '' });
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.cohort.trim()) {
      alert('All fields required');
      return;
    }
    setSubmitting(true);
    const ok = await onCreate(form);
    setSubmitting(false);
    if (ok) setForm({ name: '', email: '', cohort: '' });
  }

  return (
    <form onSubmit={submit} className="row">
      <input placeholder="Name" value={form.name} onChange={e => update('name', e.target.value)} />
      <input placeholder="Email" value={form.email} type="email" onChange={e => update('email', e.target.value)} />
      <input placeholder="Cohort (YYYY)" value={form.cohort} pattern="[0-9]{4}" onChange={e => update('cohort', e.target.value)} />
      <button type="submit" disabled={submitting}>{submitting ? 'Adding...' : 'Add Student'}</button>
    </form>
  );
}
