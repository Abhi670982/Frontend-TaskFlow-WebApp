import React from 'react';
import './MonthlySummary.css';

const MiniProgressRing = ({ percentage = 0 }) => {
  const radius = 15;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - ((percentage || 0) / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#4a5568"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#6b63ff"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

const MonthlySummary = ({ data }) => {
  const hasData = data && Array.isArray(data) && data.length > 0;

  return (
    <div className="monthly-summary">
      <h3>Monthly Summary</h3>
      {hasData ? (
        <div className="summary-grid">
          {data.map(item => (
            <div key={item.category} className="summary-item">
              <div className="category-name">{item.category}</div>
              <MiniProgressRing percentage={item.percentage} />
              <div className="stats">
                {item.completed} / {item.total}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data-fallback">No category data for this month.</div>
      )}
    </div>
  );
};

export default MonthlySummary;
