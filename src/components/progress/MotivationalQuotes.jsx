import React from 'react';
import './MotivationalQuotes.css';

const quotes = [
  "The secret of getting ahead is getting started.",
  "The best way to predict the future is to create it.",
  "Don't watch the clock; do what it does. Keep going.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
];

const MotivationalQuotes = () => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="motivational-quotes">
      <h3>Quote of the Day</h3>
      <p>"{quote}"</p>
    </div>
  );
};

export default MotivationalQuotes;
