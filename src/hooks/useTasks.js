import { useState, useEffect, useCallback, useMemo } from 'react';

const TASKS_STORAGE_KEY = 'taskflow_calendar_tasks';

// Helper to get tasks from localStorage
const getStoredTasks = () => {
  try {
    const stored = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!stored) return {};
    // Basic validation to ensure it's an object
    const parsed = JSON.parse(stored);
    return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed) ? parsed : {};
  } catch (error) {
    console.error("Failed to parse tasks from localStorage:", error);
    // If parsing fails, return an empty object to prevent app crash
    return {};
  }
};

// Helper to set tasks in localStorage
const setStoredTasks = (tasks) => {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
};

export const useTasks = () => {
  const [tasks, setTasks] = useState(getStoredTasks);

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((date, taskData) => {
    const dateKey = date.toISOString().split('T')[0];
    
    const newTask = {
      ...taskData,
      id: Date.now(), // Ensure a unique ID
      completed: taskData.completed || false, // Default completed status
      date: dateKey, // Store date with task for easier access
    };

    setTasks(prevTasks => {
      const dayTasks = prevTasks[dateKey] ? [...prevTasks[dateKey], newTask] : [newTask];
      return {
        ...prevTasks,
        [dateKey]: dayTasks,
      };
    });
  }, []);

  const updateTask = useCallback((date, updatedTask) => {
    const dateKey = date.toISOString().split('T')[0];

    setTasks(prevTasks => {
      const dayTasks = prevTasks[dateKey] || [];
      const updatedDayTasks = dayTasks.map(task => 
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      );
      
      return {
        ...prevTasks,
        [dateKey]: updatedDayTasks,
      };
    });
  }, []);

  const deleteTask = useCallback((date, taskId) => {
    const dateKey = date.toISOString().split('T')[0];

    setTasks(prevTasks => {
      const dayTasks = prevTasks[dateKey] || [];
      const updatedDayTasks = dayTasks.filter(task => task.id !== taskId);

      const newTasks = { ...prevTasks };
      if (updatedDayTasks.length > 0) {
        newTasks[dateKey] = updatedDayTasks;
      } else {
        delete newTasks[dateKey]; // Clean up empty date entries
      }
      return newTasks;
    });
  }, []);

  const toggleTaskCompleted = useCallback((date, taskId) => {
    const dateKey = typeof date === 'string' ? date : date.toISOString().split('T')[0];

    setTasks(prevTasks => {
      const dayTasks = prevTasks[dateKey] || [];
      const updatedDayTasks = dayTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );

      return {
        ...prevTasks,
        [dateKey]: updatedDayTasks,
      };
    });
  }, []);

  // Memoized analytics for performance
  const taskAnalytics = useMemo(() => {
    const allTasks = Object.values(tasks).flat();
    const today = new Date().toISOString().split('T')[0];

    const todayTasks = tasks[today] || [];
    const completedToday = todayTasks.filter(t => t.completed).length;
    const totalToday = todayTasks.length;
    const dailyProgress = totalToday > 0 ? (completedToday / totalToday) * 100 : 0;

    // Placeholder for more complex analytics
    // In a real app, you'd calculate weekly, monthly, etc. here
    
    return {
      allTasks,
      dailyProgress,
      tasksToday: {
        completed: completedToday,
        pending: totalToday - completedToday,
        total: totalToday,
      },
      // ... other analytics
    };
  }, [tasks]);

  return { 
    tasks, 
    addTask, 
    updateTask, 
    deleteTask, 
    toggleTaskCompleted,
    ...taskAnalytics 
  };
};
