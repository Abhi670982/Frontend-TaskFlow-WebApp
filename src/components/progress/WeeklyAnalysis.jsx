import React from 'react';
import { Bar } from 'react-chartjs-2';
import './WeeklyAnalysis.css';

const NoDataFallback = () => <div className="no-data-fallback">No weekly data yet. Complete tasks to see your analysis.</div>;

const WeeklyAnalysis = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="weekly-analysis">
        <h3>Weekly Analysis</h3>
        <NoDataFallback />
      </div>
    );
  }

  const chartData = {
    labels: data.map(d => d.day),
    datasets: [
      {
        label: 'Tasks Completed',
        data: data.map(d => d.completed),
        backgroundColor: '#6b63ff',
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(26, 22, 50, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 8,
      }
    },
    scales: {
      y: { 
        beginAtZero: true,
        ticks: {
          color: '#a0aec0',
          precision: 0,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        }
      },
      x: {
        ticks: {
          color: '#a0aec0',
        },
        grid: {
          display: false,
        }
      }
    },
  };

  return (
    <div className="weekly-analysis">
      <h3>Weekly Analysis</h3>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default WeeklyAnalysis;
