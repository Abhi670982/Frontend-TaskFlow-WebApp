import { useState } from 'react';
import './TodoListCard.css';

function TodoListCard({ onClose }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Add new task
  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, newTask]);
    setNewTask('');
  };

  // Delete task
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="todolist">
      {onClose && (
        <button onClick={onClose} className="mobile-close-button" aria-label="Close card">
          &times;
        </button>
      )}
      <nav>
        <img src="./todolistimg.png" alt="todolistimg" />
        <h3>To-Do List</h3>
      </nav>

      {/* Task list section */}
      <div className="task-list">
        {tasks.length === 0 ? (
          <p style={{ color: '#777', textAlign: 'center', marginTop: '20px' }}>
            No tasks yet. Add your first task below ✍️
          </p>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="task-item">
              <span>{task}</span>
              <button
                onClick={() => handleDeleteTask(index)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ff4d4d',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                ✖
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add new task section */}
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
    </div>
  );
}

export default TodoListCard;