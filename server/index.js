import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let todos = [];

app.get("/api/todos/read", (req, res) => {
  res.json(todos);
});

app.post("/api/todos/create", (req, res) => {
  const { text } = req.body;
  if (text) {
    const newTodo = { id: todos.length + 1, text };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } else {
    res.status(400).json({ error: "Text is required" });
  }
});

app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { completed } = req.body;

  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = completed;
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
