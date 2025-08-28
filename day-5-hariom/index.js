
import express from "express";

const app = express();
const PORT = 3000;


const students = [
  { id: 1, name: "Amit Sharma", age: 20, course: "Computer Science" },
  { id: 2, name: "Priya Verma", age: 22, course: "Mechanical Engineering" },
  { id: 3, name: "Rahul Singh", age: 19, course: "Electrical Engineering" },
  { id: 4, name: "Neha Gupta", age: 21, course: "Civil Engineering" },
];


app.get("/api/students", (req, res) => {
  res.json(students);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
