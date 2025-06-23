import React, { useState, useEffect } from "react";
import { MdClose } from 'react-icons/md';
import "./App.css";

const STORAGE_KEY = "my-todo-list";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input.trim(), done: false }]);
    setInput("");
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <h1>TODO List</h1>
        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Введи задачу"
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
          />
          <button onClick={addTodo}>Додати</button>
        </div>
        
        <div className="todo-zone">
          <ul className="todo-list">
            {todos.map((todo, i) => (
              <li
                key={i}
                className={todo.done ? "done" : ""}
                onClick={() => toggleTodo(i)}
              >
                <input
                  type="checkbox"
                  checked={todo.done}
                  readOnly
                />
                <span>{todo.text}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(i);
                  }}
                  className="delete-button"
                >
                  <MdClose className="delete-button-img" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
