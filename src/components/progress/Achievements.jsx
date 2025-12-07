import React from 'react';
import './Achievements.css';

const Achievements = ({ achievements }) => {
  const hasAchievements = achievements && Array.isArray(achievements) && achievements.length > 0;

  return (
    <div className="achievements">
      <h3>Achievements</h3>
      {hasAchievements ? (
        <div className="achievements-grid">
          {achievements.map(ach => (
            <div key={ach.id} className={`achievement-item ${ach.unlocked ? 'unlocked' : ''}`} title={ach.description}>
              <div className="icon">{ach.unlocked ? '🏆' : '🔒'}</div>
              <div className="title">{ach.title}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data-fallback">No achievements unlocked yet. Keep completing tasks!</div>
      )}
    </div>
  );
};

export default Achievements;
