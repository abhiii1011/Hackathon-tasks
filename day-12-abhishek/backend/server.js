const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, text: "Learn React" },
  { id: 2, text: "Build To-Do App" }
];


app.get("/todos", (req, res) => {
  res.json(todos);
});


app.post("/todos", (req, res) => {
  const newTodo = { id: Date.now(), text: req.body.text };
  todos.push(newTodo);
  res.json(newTodo);
});


app.delete("/todos/:id", (req, res) => {
  todos = todos.filter(todo => todo.id !== parseInt(req.params.id));
  res.json({ message: "Todo deleted" });
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
