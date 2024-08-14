"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    // Fetch todos from backend
    axios
      .get("http://localhost:3000/api/todos/read")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const addTodo = () => {
    if (!newTodo) return;
    // Send new todo to backend
    axios
      .post("http://localhost:3000/api/todos/create", { text: newTodo })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo("");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  const toggleTodoCompletion = async (id, completed) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/todos/${id}`,
        { completed: !completed }
      );

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id
            ? { ...todo, completed: response.data.completed }
            : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 shadow-lg rounded-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-5">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
          className="flex-grow text-black p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add
        </button>
      </div>
      <ul className="list-none p-0">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex text-black items-center justify-between p-2 border-b border-gray-200 ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            <span>{todo.text}</span>
            <button
              onClick={() => toggleTodoCompletion(todo.id, todo.completed)}
              className={`p-1 rounded-lg text-white ${
                todo.completed
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
