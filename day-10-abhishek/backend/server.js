import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4001; // using different default port than Day 9

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

let nextId = 4;
const students = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', cohort: '2025' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', cohort: '2025' },
  { id: 3, name: 'Charlie Singh', email: 'charlie@example.com', cohort: '2026' },
];

function validate(body) {
  const errors = {};
  if (!body.name || body.name.trim().length < 2) errors.name = 'Name must be at least 2 chars';
  if (!body.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)) errors.email = 'Valid email required';
  if (!body.cohort || !/^[0-9]{4}$/.test(body.cohort)) errors.cohort = 'Cohort must be 4-digit year';
  return errors;
}

app.get('/api/health', (_, res) => res.json({ ok: true, students: students.length }));

app.get('/api/students', (req, res) => {
  let list = [...students];
  const { q, cohort, sort = 'name' } = req.query;
  if (q) {
    const lc = q.toLowerCase();
    list = list.filter(s => s.name.toLowerCase().includes(lc) || s.email.toLowerCase().includes(lc));
  }
  if (cohort) list = list.filter(s => s.cohort === cohort);
  if (sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name));
  if (sort === 'cohort') list.sort((a,b) => a.cohort.localeCompare(b.cohort) || a.name.localeCompare(b.name));
  res.json(list);
});

app.post('/api/students', (req, res) => {
  const errors = validate(req.body);
  if (Object.keys(errors).length) return res.status(400).json({ errors });
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
  if (Object.keys(errors).length) return res.status(400).json({ errors });
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

app.listen(PORT, () => console.log(`Day 10 Student Directory API on http://localhost:${PORT}`));
