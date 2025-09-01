const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const students = [
  { id: 1, name: "Abhishek", age: 21 },
  { id: 2, name: "Priya", age: 20 },
  { id: 3, name: "Rohan", age: 22 }
];

app.get("/students", (req, res) => {
  res.json(students);
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
