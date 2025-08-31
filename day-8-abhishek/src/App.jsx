import React, { useState, useMemo } from 'react';
import TodoItem from './components/TodoItem.jsx';

let nextId = 1;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  function addTodo(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo = {
      id: nextId++,
      text: trimmed,
      done: false,
      priority,
      created: Date.now(),
    };
    setTodos(t => [newTodo, ...t]);
    setText('');
  }

  function toggle(id) {
    setTodos(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }
  function update(updated) {
    setTodos(ts => ts.map(t => t.id === updated.id ? updated : t));
  }
  function remove(id) {
    setTodos(ts => ts.filter(t => t.id !== id));
  }
  function clearCompleted() {
    setTodos(ts => ts.filter(t => !t.done));
  }

  const visible = useMemo(() => {
    return todos.filter(t => {
      if (filter === 'active' && t.done) return false;
      if (filter === 'completed' && !t.done) return false;
      if (search && !t.text.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [todos, filter, search]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.done).length;
    const remaining = total - completed;
    const pct = total ? Math.round((completed / total) * 100) : 0;
    return { total, completed, remaining, pct };
  }, [todos]);

  return (
    <div className="app">
      <header>
        <h1>Day 8: Todo List</h1>
        <p style={{opacity:.7, margin:0}}>Local state only. No persistence.</p>
      </header>

      <section className="panel" style={{ marginBottom: '.75rem' }}>
        <form onSubmit={addTodo} className="row">
          <input
            type="text"
            placeholder="Add a todo..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button type="submit">Add</button>
        </form>
        <div className="search-row">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="ghost" onClick={clearCompleted}>Clear Completed</button>
        </div>
      </section>

      <section className="panel" style={{ marginBottom: '.75rem' }}>
        <div className="filter-bar">
          {['all','active','completed'].map(f => (
            <button
              key={f}
              className={filter === f ? 'active' : 'ghost'}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="stats">
          <span>Total: {stats.total}</span>
          <span>Done: {stats.completed}</span>
            <span>Remaining: {stats.remaining}</span>
          <span>{stats.pct}%</span>
          <progress value={stats.completed} max={stats.total || 1} />
        </div>
      </section>

      <ul className="todo-list">
        {visible.length === 0 && (
          <div className="empty">No todos match. Add some tasks!</div>
        )}
        {visible.map(t => (
          <TodoItem
            key={t.id}
            todo={t}
            onToggle={toggle}
            onUpdate={update}
            onDelete={remove}
          />
        ))}
      </ul>

      <footer>
        Built with React hooks. Edit inline by clicking text. Enter to save, Esc to cancel.
      </footer>
    </div>
  );
}
