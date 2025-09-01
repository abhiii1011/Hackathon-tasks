import React, { useState } from 'react';

export default function StudentRow({ student, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ name: student.name, email: student.email, cohort: student.cohort });

  function change(field, value) {
    setDraft(d => ({ ...d, [field]: value }));
  }

  async function save() {
    await onUpdate(student.id, draft);
    setEditing(false);
  }

  function cancel() {
    setDraft({ name: student.name, email: student.email, cohort: student.cohort });
    setEditing(false);
  }

  return (
    <tr>
      <td>{student.id}</td>
      <td>
        {editing ? (
          <div className="inline-edit">
            <input value={draft.name} onChange={e => change('name', e.target.value)} />
          </div>
        ) : student.name}
      </td>
      <td>
        {editing ? (
          <input value={draft.email} onChange={e => change('email', e.target.value)} />
        ) : student.email}
      </td>
      <td>
        {editing ? (
          <input value={draft.cohort} onChange={e => change('cohort', e.target.value)} />
        ) : <span className="badge">{student.cohort}</span>}
      </td>
      <td className="actions">
        {editing ? (
          <>
            <button onClick={save}>Save</button>
            <button className="secondary" type="button" onClick={cancel}>Cancel</button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => setEditing(true)}>Edit</button>
            <button className="danger" type="button" onClick={() => onDelete(student.id)}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
}
