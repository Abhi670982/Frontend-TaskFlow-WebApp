import { useMemo } from 'react';
import { startOfToday, subDays, eachDayOfInterval, format } from 'date-fns';

export const useTaskAnalytics = (allTasks) => { // Accept allTasks as a parameter
  const today = startOfToday();

  const completedTasks = useMemo(() => allTasks.filter(task => task.completed), [allTasks]);

  const dailyProgress = useMemo(() => {
    const todayKey = format(today, 'yyyy-MM-dd');
    const todaysTasks = allTasks.filter(task => task.date === todayKey); // Filter by date stored in task
    const completedToday = todaysTasks.filter(task => task.completed).length;
    const totalToday = todaysTasks.length;
    const percentage = totalToday > 0 ? (completedToday / totalToday) * 100 : 0;
    return {
      completed: completedToday,
      pending: totalToday - completedToday,
      total: totalToday,
      percentage,
    };
  }, [allTasks, today]);

  const weeklyAnalysis = useMemo(() => {
    const last7Days = eachDayOfInterval({ start: subDays(today, 6), end: today });
    return last7Days.map(day => {
      const dayKey = format(day, 'yyyy-MM-dd');
      const dayTasks = allTasks.filter(task => task.date === dayKey); // Filter by date stored in task
      return {
        day: format(day, 'EEE'),
        completed: dayTasks.filter(task => task.completed).length,
      };
    });
  }, [allTasks, today]);

  const monthlyHeatmap = useMemo(() => {
    const heatmap = {};
    allTasks.forEach(task => {
      if (task.completed) {
        const dateKey = task.date;
        heatmap[dateKey] = (heatmap[dateKey] || 0) + 1;
      }
    });
    return heatmap;
  }, [allTasks]);

  const monthlySummary = useMemo(() => {
    const summary = {
      Work: { completed: 0, total: 0 },
      Personal: { completed: 0, total: 0 },
      Study: { completed: 0, total: 0 },
      Fitness: { completed: 0, total: 0 },
      Other: { completed: 0, total: 0 },
    };

    allTasks.forEach(task => {
      if (summary[task.category]) {
        summary[task.category].total++;
        if (task.completed) {
          summary[task.category].completed++;
        }
      }
    });

    return Object.keys(summary).map(category => ({
      category,
      ...summary[category],
      percentage: summary[category].total > 0 ? (summary[category].completed / summary[category].total) * 100 : 0,
    }));
  }, [allTasks]);

  return {
    dailyProgress,
    weeklyAnalysis,
    monthlyHeatmap,
    monthlySummary,
    totalCompleted: completedTasks.length,
  };
};
