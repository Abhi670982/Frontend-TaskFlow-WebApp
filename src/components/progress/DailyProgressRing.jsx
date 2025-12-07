import React, { useState, useEffect } from 'react';
import './DailyProgressRing.css';

const DailyProgressRing = ({ percentage = 0 }) => {
  const safePercentage = percentage || 0;
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const [popIn, setPopIn] = useState(false);

  useEffect(() => {
    if (safePercentage > displayPercentage) {
      setPopIn(true);
      const timer = setTimeout(() => setPopIn(false), 500); // Pop-in animation duration
      return () => clearTimeout(timer);
    }
  }, [safePercentage, displayPercentage]);

  useEffect(() => {
    // Smooth animation for percentage
    const animationDuration = 500; // ms
    const frameRate = 1000 / 60; // 60 frames per second
    const totalFrames = animationDuration / frameRate;
    let frame = 0;
    const startPercentage = displayPercentage;
    const difference = safePercentage - startPercentage;

    // Don't animate if there's no change
    if (difference === 0) return;

    const animate = () => {
      if (frame < totalFrames) {
        frame++;
        const animatedValue = startPercentage + (difference * (frame / totalFrames));
        setDisplayPercentage(animatedValue);
        requestAnimationFrame(animate);
      } else {
        setDisplayPercentage(safePercentage);
      }
    };

    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safePercentage]);


  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (displayPercentage / 100) * circumference;

  return (
    <div className={`daily-progress-ring ${popIn ? 'pop-in' : ''}`} aria-label={`Daily task completion: ${Math.round(safePercentage)}%`}>
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
          className="progress-circle"
        />
      </svg>
      <div className="percentage" aria-live="polite">{Math.round(displayPercentage)}%</div>
    </div>
  );
};

export default React.memo(DailyProgressRing);
