import React from 'react';
import './ProgressFooter.css';

function ProgressFooter() {
  return (
    <footer className="progress-footer">
      <div className="progress-footer-content">
        <div className="footer-column about">
          <h3 className="footer-logo">TaskFlow</h3>
          <p>“The smartest way to manage your day. Your tasks, your schedule, your flow.”</p>
        </div>
        <div className="footer-column links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/app">Home</a></li>
            <li><a href="/calendar">Calendar</a></li>
            <li><a href="/progress">Progress</a></li>
            <li><a href="#!">To-Do List</a></li>
          </ul>
        </div>
        <div className="footer-column services">
          <h4>Services</h4>
          <ul>
            <li>Task Management</li>
            <li>Smart Reminders</li>
            <li>Productivity Insights</li>
            <li>Progress Tracking</li>
            <li>Streak System</li>
            <li>UI/UX Smart Layouts</li>
          </ul>
        </div>
        <div className="footer-column contact">
          <h4>Contact Info</h4>
          <p>taskflow.app@gmail.com</p>
          <p>New Delhi, India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-separator"></div>
        <p>© 2025 TaskFlow. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default ProgressFooter;
