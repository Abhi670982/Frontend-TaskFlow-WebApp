import { useState, useEffect, useMemo } from 'react';
import { useStreak } from './useStreak'; // Assuming useStreak might need allTasks or be independent

const ACHIEVEMENTS_STORAGE_KEY = 'taskflow_achievements';

const allAchievements = [
  { id: '3-day-streak', title: '3-Day Streak', description: 'Complete at least one task for 3 days in a row.' },
  { id: '7-day-streak', title: '7-Day Streak', description: 'Complete at least one task for 7 days in a row.' },
  { id: '15-day-streak', title: '15-Day Streak', description: 'Complete at least one task for 15 days in a row.' },
  { id: '30-day-streak', title: '30-Day Streak', description: 'Complete at least one task for 30 days in a row.' },
  { id: 'task-master', title: 'Task Master', description: 'Complete 100 tasks.' },
  { id: 'consistency-king', title: 'Consistency King', description: 'Be active for 14 days.' },
  { id: 'night-owl', title: 'Night Owl', description: 'Complete a task after 10 PM.' },
];

const getStoredAchievements = () => {
  try {
    const stored = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to parse achievements from localStorage:", error);
    return [];
  }
};

const setStoredAchievements = (unlocked) => {
  try {
    localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(unlocked));
  } catch (error) {
    console.error("Failed to save achievements to localStorage:", error);
  }
};

export const useAchievements = (allTasks) => { // Accept allTasks as a parameter
  const [unlocked, setUnlocked] = useState(getStoredAchievements);
  const streak = useStreak(allTasks); // Pass allTasks to useStreak

  const totalCompleted = useMemo(() => allTasks.filter(task => task.completed).length, [allTasks]);

  useEffect(() => {
    const newUnlocked = [...unlocked];

    if (streak.count >= 3 && !newUnlocked.includes('3-day-streak')) newUnlocked.push('3-day-streak');
    if (streak.count >= 7 && !newUnlocked.includes('7-day-streak')) newUnlocked.push('7-day-streak');
    if (streak.count >= 15 && !newUnlocked.includes('15-day-streak')) newUnlocked.push('15-day-streak');
    if (streak.count >= 30 && !newUnlocked.includes('30-day-streak')) newUnlocked.push('30-day-streak');
    if (totalCompleted >= 100 && !newUnlocked.includes('task-master')) newUnlocked.push('task-master');

    // Logic for 'Night Owl' - check if any completed task has a time after 10 PM
    const hasNightOwlTask = allTasks.some(task => {
      if (task.completed && task.time) {
        const [hours, minutes] = task.time.split(':').map(Number);
        return hours >= 22; // 10 PM or later
      }
      return false;
    });
    if (hasNightOwlTask && !newUnlocked.includes('night-owl')) newUnlocked.push('night-owl');


    if (newUnlocked.length > unlocked.length) {
      setUnlocked(newUnlocked);
      setStoredAchievements(newUnlocked);
    }
  }, [streak, totalCompleted, allTasks, unlocked]); // Add allTasks to dependencies

  const achievements = allAchievements.map(ach => ({
    ...ach,
    unlocked: unlocked.includes(ach.id),
  }));

  return achievements;
};
