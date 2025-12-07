import React, { useMemo } from 'react';
import './ProductivityInsights.css';
import { format, getDay, getHours } from 'date-fns';

const ProductivityInsights = ({ allTasks }) => {
  const insights = useMemo(() => {
    if (!allTasks || allTasks.length === 0) {
      return ["Start adding tasks to get your first insights!"];
    }

    const completedTasks = allTasks.filter(task => task.completed);
    if (completedTasks.length === 0) {
      return ["Complete some tasks to unlock productivity insights!"];
    }

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const hourRanges = Array.from({ length: 24 }, (_, i) => `${i}:00-${i + 1}:00`);

    // Insight 1: Most Productive Day
    const dayCounts = {};
    completedTasks.forEach(task => {
      const dayOfWeek = getDay(new Date(task.date)); // task.date is 'yyyy-MM-dd'
      dayCounts[dayOfWeek] = (dayCounts[dayOfWeek] || 0) + 1;
    });
    const mostProductiveDayIndex = Object.keys(dayCounts).reduce((a, b) => dayCounts[a] > dayCounts[b] ? a : b, null);
    const mostProductiveDay = mostProductiveDayIndex !== null ? dayNames[mostProductiveDayIndex] : null;

    // Insight 2: Peak Completion Hour
    const hourCounts = {};
    completedTasks.forEach(task => {
      if (task.time) {
        const hour = getHours(new Date(`${task.date}T${task.time}`));
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
      }
    });
    const peakHourIndex = Object.keys(hourCounts).reduce((a, b) => hourCounts[a] > hourCounts[b] ? a : b, null);
    const peakHour = peakHourIndex !== null ? `${peakHourIndex}:00-${parseInt(peakHourIndex) + 1}:00` : null;

    // Insight 3: Most Frequent Category
    const categoryCounts = {};
    completedTasks.forEach(task => {
      categoryCounts[task.category] = (categoryCounts[task.category] || 0) + 1;
    });
    const mostFrequentCategory = Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b, null);

    const generatedInsights = [];
    if (mostProductiveDay) {
      generatedInsights.push(`Your most productive day is typically ${mostProductiveDay}.`);
    }
    if (peakHour) {
      generatedInsights.push(`You tend to complete tasks most often between ${peakHour}.`);
    }
    if (mostFrequentCategory) {
      generatedInsights.push(`You're a ${mostFrequentCategory} master, completing many tasks in this category.`);
    }
    if (generatedInsights.length === 0) {
      generatedInsights.push("Keep completing tasks to reveal personalized insights!");
    }

    return generatedInsights;
  }, [allTasks]);

  return (
    <div className="productivity-insights">
      <h3>Productivity Insights</h3>
      {insights.map((insight, index) => (
        <p key={index}>{insight}</p>
      ))}
    </div>
  );
};

export default ProductivityInsights;
