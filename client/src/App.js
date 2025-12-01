import React, { useEffect, useState } from 'react';
import service from './service.js';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    try {
      const todos = await service.getTasks();
      setTodos(todos);
    } catch (error) {
      console.error('Failed to load todos:', error);
    }
  }

  async function createTodo(e) {
    e.preventDefault();
    try {
      if (!newTodo.trim()) {
        return;
      }
      await service.addTask(newTodo);
      setNewTodo("");
      await getTodos();
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  }

  async function updateCompleted(todo, iscomplete) {
    try {
      await service.setCompleted(todo.id, iscomplete);
      await getTodos();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  }

  async function deleteTodo(id) {
    try {
      await service.deleteTask(id);
      await getTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li className={todo.iscomplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input className="toggle" type="checkbox" checked={todo.iscomplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section >
  );
}

export default App;