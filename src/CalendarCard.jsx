import './CalendarCard.css';
import { useNavigate } from "react-router-dom";

function CalendarCard({ onClose }) {
  const navigate = useNavigate();

  const handleViewCalendar = () => {
    navigate("/calendar");
  };

  return (
    <div className="card2">
      {onClose && (
        <button 
          onClick={onClose} 
          className="mobile-close-button" 
          aria-label="Close card"
        >
          &times;
        </button>
      )}

      <div className="card-content-wrapper">
        
        <nav className="card-header">
          <img src="./calendar.jpg" alt="calendar icon" className="card-icon" />
          <h3>Schedule Tasks on Calendar</h3>
        </nav>

        <p className="card-description">
          Plan your day, week, or month effortlessly. Add tasks, set reminders,
          and manage everything visually on your interactive calendar.
        </p>

        <img
          src="./CardTwoImage.png"
          alt="calendar preview"
          className="calendar-preview"
          height="100px"
        />

        {/* 🚀 WORKING NAVIGATION BUTTON */}
        <button className="view-btn" onClick={handleViewCalendar}>
          View Calendar
        </button>

      </div>
    </div>
  );
}

export default CalendarCard;
