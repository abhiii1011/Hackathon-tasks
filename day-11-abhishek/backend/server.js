const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); // to handle JSON body

// Sample in-memory data (acting as DB)
let students = [
  { id: 1, name: "Abhishek", age: 21 },
  { id: 2, name: "Riya", age: 22 }
];

// GET: Fetch all students
app.get("/students", (req, res) => {
  res.json(students);
});

// POST: Add new student
app.post("/students", (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    age: req.body.age
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT: Update student by ID
app.put("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = req.body.name || student.name;
  student.age = req.body.age || student.age;

  res.json(student);
});

// DELETE: Remove student by ID
app.delete("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  students = students.filter(s => s.id !== studentId);

  res.json({ message: "Student deleted successfully" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
