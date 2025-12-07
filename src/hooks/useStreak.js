import { useMemo } from 'react';
import { subDays, format, differenceInCalendarDays } from 'date-fns';

const STREAK_STORAGE_KEY = 'taskflow_streak';

const getStoredStreak = () => {
  try {
    const stored = localStorage.getItem(STREAK_STORAGE_KEY);
    return stored ? JSON.parse(stored) : { count: 0, lastDay: null };
  } catch (error) {
    console.error("Failed to parse streak from localStorage:", error);
    return { count: 0, lastDay: null };
  }
};

const setStoredStreak = (streak) => {
  try {
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(streak));
  } catch (error) {
    console.error("Failed to save streak to localStorage:", error);
  }
};

export const useStreak = (allTasks) => { // Accept allTasks as a parameter
  const streak = useMemo(() => {
    const today = new Date();
    const yesterday = subDays(today, 1);

    // Get unique dates where at least one task was completed
    const completedDates = [...new Set(
      allTasks
        .filter(task => task.completed)
        .map(task => task.date) // task.date is already 'yyyy-MM-dd'
    )]
      .map(dateKey => new Date(dateKey))
      .sort((a, b) => b.getTime() - a.getTime()); // Sort descending

    if (completedDates.length === 0) {
      setStoredStreak({ count: 0, lastDay: null });
      return { count: 0, lastDay: null };
    }

    let currentStreak = 0;
    let lastStreakDay = null;

    const mostRecentCompletion = completedDates[0];
    const todayFormatted = format(today, 'yyyy-MM-dd');
    const yesterdayFormatted = format(yesterday, 'yyyy-MM-dd');
    const mostRecentCompletionFormatted = format(mostRecentCompletion, 'yyyy-MM-dd');

    // Check if the most recent completion was today or yesterday
    if (mostRecentCompletionFormatted === todayFormatted || mostRecentCompletionFormatted === yesterdayFormatted) {
      currentStreak = 1;
      lastStreakDay = mostRecentCompletion;

      for (let i = 1; i < completedDates.length; i++) {
        const diff = differenceInCalendarDays(completedDates[i - 1], completedDates[i]);
        if (diff === 1) { // If consecutive day
          currentStreak++;
        } else if (diff > 1) { // Gap in streak
          break;
        }
        // If diff is 0, it means multiple tasks completed on the same day, continue
      }
    }
    
    const newStreak = { count: currentStreak, lastDay: lastStreakDay };
    setStoredStreak(newStreak);
    return newStreak;
  }, [allTasks]); // Depend on allTasks

  return streak;
};
