import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory store
let notes = [];

// Helpers
const findNote = (id) => notes.find(n => n.id === id);

// Routes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const { title = '', content = '' } = req.body || {};
  if (!title && !content) return res.status(400).json({ error: 'Title or content required' });
  const note = { id: nanoid(8), title, content, createdAt: Date.now(), updatedAt: Date.now() };
  notes.unshift(note);
  res.status(201).json(note);
});

app.get('/api/notes/:id', (req, res) => {
  const note = findNote(req.params.id);
  if (!note) return res.status(404).json({ error: 'Not found' });
  res.json(note);
});

app.put('/api/notes/:id', (req, res) => {
  const note = findNote(req.params.id);
  if (!note) return res.status(404).json({ error: 'Not found' });
  const { title, content } = req.body || {};
  if (title !== undefined) note.title = title;
  if (content !== undefined) note.content = content;
  note.updatedAt = Date.now();
  res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
  const idx = notes.findIndex(n => n.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const removed = notes.splice(idx, 1)[0];
  res.json(removed);
});

app.delete('/api/notes', (req, res) => {
  notes = [];
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Notes API running on http://localhost:${PORT}`);
});
