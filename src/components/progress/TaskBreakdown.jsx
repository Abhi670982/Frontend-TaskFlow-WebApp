import React from 'react';
import './TaskBreakdown.css';

const TaskBreakdown = ({ completed = 0, pending = 0 }) => {
  return (
    <div className="task-breakdown">
      <div className="breakdown-item">
        <div className="count">{completed || 0}</div>
        <div className="label">Tasks Completed Today</div>
      </div>
      <div className="breakdown-item">
        <div className="count">{pending || 0}</div>
        <div className="label">Tasks Pending</div>
      </div>
    </div>
  );
};

export default TaskBreakdown;
