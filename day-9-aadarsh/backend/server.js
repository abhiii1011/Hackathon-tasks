import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// In-memory data store
let nextId = 3;
const students = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', cohort: '2025' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', cohort: '2025' },
];

function validate(body) {
  const errors = [];
  if (!body.name || body.name.trim().length < 2) errors.push('Name must be at least 2 characters.');
  if (!body.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)) errors.push('Valid email required.');
  if (!body.cohort || !/^[0-9]{4}$/.test(body.cohort)) errors.push('Cohort must be YYYY.');
  return errors;
}

app.get('/api/health', (_, res) => res.json({ ok: true }));

app.get('/api/students', (req, res) => {
  res.json(students);
});

app.post('/api/students', (req, res) => {
  const errors = validate(req.body);
  if (errors.length) return res.status(400).json({ errors });
  const student = { id: nextId++, name: req.body.name.trim(), email: req.body.email.trim(), cohort: req.body.cohort };
  students.push(student);
  res.status(201).json(student);
});

app.get('/api/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);
  if (!student) return res.status(404).json({ error: 'Not found' });
  res.json(student);
});

app.put('/api/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = students.findIndex(s => s.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const errors = validate(req.body);
  if (errors.length) return res.status(400).json({ errors });
  students[idx] = { id, name: req.body.name.trim(), email: req.body.email.trim(), cohort: req.body.cohort };
  res.json(students[idx]);
});

app.delete('/api/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = students.findIndex(s => s.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const removed = students.splice(idx, 1)[0];
  res.json(removed);
});

app.use((_, res) => res.status(404).json({ error: 'Route not found' }));

app.listen(PORT, () => {
  console.log(`Student Directory API listening on http://localhost:${PORT}`);
});
