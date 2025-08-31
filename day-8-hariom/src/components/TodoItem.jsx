import React, { useState } from 'react';

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function commit() {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== todo.text) {
      onUpdate({ ...todo, text: trimmed });
    }
    setEditing(false);
  }

  return (
    <li className={"todo" + (todo.done ? ' done' : '')}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        style={{ marginTop: '.3rem' }}
      />
      <main>
        {editing ? (
          <textarea
            autoFocus
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                commit();
              } else if (e.key === 'Escape') {
                setDraft(todo.text);
                setEditing(false);
              }
            }}
            rows={1}
          />
        ) : (
          <div
            onClick={() => setEditing(true)}
            style={{ cursor: 'text', whiteSpace: 'pre-wrap', lineHeight: 1.35 }}
          >
            {todo.text}
          </div>
        )}
        <div className="meta">
          <span className={"tag priority-" + todo.priority}>{todo.priority}</span>
          <span>{new Date(todo.created).toLocaleTimeString()}</span>
          {todo.done && <span className="tag" style={{ background:'#10b981', color:'#022c22' }}>Done</span>}
        </div>
      </main>
      <div className="controls">
        {!editing && (
          <button className="ghost" onClick={() => setEditing(true)} title="Edit">
            ✏️
          </button>
        )}
        <button className="ghost" onClick={() => onDelete(todo.id)} title="Delete">
          🗑️
        </button>
      </div>
    </li>
  );
}
