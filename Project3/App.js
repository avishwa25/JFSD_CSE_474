import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks');
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    await axios.post('http://localhost:5000/api/tasks', { title: newTask });
    setNewTask('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
      title: task.title,
      completed: !task.completed
    });
    fetchTasks();
  };

  const updateTitle = async (task, newTitle) => {
    await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
      title: newTitle,
      completed: task.completed
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>TaskTracker</h1>
      <input
        placeholder="Add task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task)}
            />
            <input
              value={task.title}
              onChange={(e) => updateTitle(task, e.target.value)}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                border: 'none',
                background: 'transparent',
              }}
            />
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
