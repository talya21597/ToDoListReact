import React, { useEffect, useState } from 'react';
import service from './service.js';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getTodos() {
    try {
      setLoading(true);
      setError(null);
      const todos = await service.getTasks();
      setTodos(todos);
    } catch (error) {
      setError('Failed to load tasks');
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }

  async function createTodo(e) {
    e.preventDefault();
    try {
      if (!newTodo.trim()) {
        return;
      }
      setError(null);
      await service.addTask(newTodo);
      setNewTodo("");
      await getTodos();
    } catch (error) {
      setError('Failed to create task');
    }
  }

  async function updateCompleted(todo, iscomplete) {
    try {
      setError(null);
      await service.setCompleted(todo.id, iscomplete);
      await getTodos();
    } catch (error) {
      setError('Failed to update task');
    }
  }

  async function deleteTodo(id) {
    try {
      setError(null);
      await service.deleteTask(id);
      await getTodos();
    } catch (error) {
      setError('Failed to delete task');
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        {error && <div style={{ color: 'red', padding: '10px', marginBottom: '10px' }}>{error}</div>}
        <form onSubmit={createTodo}>
          <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} disabled={loading} />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        {loading && <p style={{ textAlign: 'center', color: '#999' }}>Loading tasks...</p>}
        {!loading && todos.length === 0 && <p style={{ textAlign: 'center', color: '#999' }}>No tasks yet</p>}
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li className={todo.iscomplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input className="toggle" type="checkbox" checked={todo.iscomplete} onChange={(e) => updateCompleted(todo, e.target.checked)} disabled={loading} />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)} disabled={loading}></button>
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