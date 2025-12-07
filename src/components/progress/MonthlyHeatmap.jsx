import React from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, getDay } from 'date-fns';
import './MonthlyHeatmap.css';

const MonthlyHeatmap = ({ data }) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const firstDayOfMonth = getDay(monthStart);

  const heatmapCells = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    heatmapCells.push(<div key={`empty-${i}`} className="heatmap-cell empty"></div>);
  }

  daysInMonth.forEach(day => {
    const dateKey = format(day, 'yyyy-MM-dd');
    const count = data[dateKey] || 0;
    const intensity = Math.min(count / 5, 1); // Cap intensity at 5 tasks for max color
    heatmapCells.push(
      <div
        key={dateKey}
        className="heatmap-cell"
        style={{ backgroundColor: `rgba(107, 99, 255, ${intensity})` }}
        title={`${dateKey}: ${count} tasks`}
      ></div>
    );
  });

  return (
    <div className="monthly-heatmap">
      <h3>Monthly Heatmap</h3>
      <div className="heatmap-grid">{heatmapCells}</div>
    </div>
  );
};

export default MonthlyHeatmap;
