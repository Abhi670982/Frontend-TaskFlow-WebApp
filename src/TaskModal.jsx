import React, { useState, useEffect, useMemo } from 'react';
import './TaskModal.css';

const CATEGORIES = [
  { name: 'Work', color: '#3b82f6' },
  { name: 'Personal', color: '#8b5cf6' },
  { name: 'Study', color: '#10b981' },
  { name: 'Fitness', color: '#f97316' },
  { name: 'Other', color: '#64748b' },
];

const PRIORITIES = ['Low', 'Medium', 'High'];

function TaskModal({ isOpen, onClose, onSave, onDelete, onToggleComplete, selectedDate, tasksForDate, taskToEdit, setTaskToEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'form'
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [priority, setPriority] = useState(PRIORITIES[1]);
  const [time, setTime] = useState('');
  const [completed, setCompleted] = useState(false);

  const formattedDate = useMemo(() => {
    if (!selectedDate) return '';
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.name);
      setDescription(taskToEdit.description || '');
      setCategory(taskToEdit.category || CATEGORIES[0].name);
      setPriority(taskToEdit.priority || PRIORITIES[1]);
      setTime(taskToEdit.time || '');
      setCompleted(taskToEdit.completed || false);
      setIsEditing(true);
      setCurrentView('form');
    } else {
      setIsEditing(false);
      resetForm();
    }
  }, [taskToEdit]);

  useEffect(() => {
    if (isOpen) {
      if (tasksForDate.length > 0 && !taskToEdit) {
        setCurrentView('list');
      } else {
        setCurrentView('form');
      }
    } else {
      setTimeout(() => {
        setCurrentView('list');
        setTaskToEdit(null);
      }, 300);
    }
  }, [isOpen, tasksForDate, taskToEdit, setTaskToEdit]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setCategory(CATEGORIES[0].name);
    setPriority(PRIORITIES[1]);
    setTime('');
    setCompleted(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const taskData = {
      id: isEditing ? taskToEdit.id : Date.now(),
      name: name.trim(),
      description: description.trim(),
      category,
      priority,
      time,
      completed: completed,
    };
    onSave(taskData);
    onClose();
  };

  const handleDelete = (taskId) => {
    onDelete(taskId);
    if (tasksForDate.length <= 1) {
      onClose();
    }
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="task-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <h3>{formattedDate}</h3>
        </div>

        {currentView === 'list' && (
          <div className="task-list-view">
            <h4>Tasks for today</h4>
            <ul className="task-list">
              {tasksForDate.map(task => (
                <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-info" onClick={() => onToggleComplete(task.id)}>
                    <span 
                      className="task-category-dot" 
                      style={{ backgroundColor: CATEGORIES.find(c => c.name === task.category)?.color || '#64748b' }}
                    ></span>
                    <p>{task.name}</p>
                  </div>
                  <div className="task-actions">
                    <button onClick={() => handleEditClick(task)}>Edit</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
            <button className="primary-btn" onClick={() => setCurrentView('form')}>
              Add New Task
            </button>
          </div>
        )}

        {currentView === 'form' && (
          <div className="task-form-view">
            <h4>{isEditing ? 'Edit Task' : 'Create New Task'}</h4>
            <form onSubmit={handleSave} className="task-form">
              <div className="form-group">
                <label htmlFor="task-name">Task Name</label>
                <input
                  id="task-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Finish project report"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="task-desc">Description (Optional)</label>
                <textarea
                  id="task-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add more details..."
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="task-category">Category</label>
                  <select id="task-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    {CATEGORIES.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="task-priority">Priority</label>
                  <select id="task-priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="task-time">Time (Optional)</label>
                <input
                  id="task-time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="form-group-checkbox">
                <input
                  id="task-completed"
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                />
                <label htmlFor="task-completed">Mark this task as done</label>
              </div>
              <div className="form-actions">
                {currentView === 'form' && tasksForDate.length > 0 && !isEditing && (
                   <button type="button" className="secondary-btn" onClick={() => setCurrentView('list')}>Back to List</button>
                )}
                <button type="submit" className="primary-btn">{isEditing ? 'Save Changes' : 'Add Task'}</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskModal;