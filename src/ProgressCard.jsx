import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import './ProgressCard.css';
import cardThreeImage from './assets/CardThreeImage.png';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function ProgressCard({ onClose }) {
  const navigate = useNavigate(); // <-- make sure this is defined BEFORE using it

  const handleProgress = () => {
    navigate('/progress');
  };

  const [progress, setProgress] = useState(75);

  const doughnutData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: ['#6b63ff', '#4a5568'],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [2, 3, 4, 5, 3, 4, 6],
        backgroundColor: '#6b63ff',
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="card3">
      {onClose && (
        <button onClick={onClose} className="mobile-close-button" aria-label="Close card">
          &times;
        </button>
      )}
      <div className="card-content-wrapper">
        <nav className="progress-header">
          <img src={cardThreeImage} alt="progress icon" height="80px" />
          <h3>Track Your Progress</h3>
        </nav>

        <p>
          Visualize your productivity. Track completed tasks, monitor your weekly
          streaks, and stay motivated with progress insights.
        </p>

        <div className="chart-section">
          <div className="circle-chart">
            <Doughnut data={doughnutData} options={{ cutout: '70%' }} />
            <div className="center-text">{progress}%</div>
          </div>
          <div className="bar-chart">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        <button className="view-stats-btn" onClick={handleProgress}>View Stats</button>
      </div>
    </div>
  );
}

export default ProgressCard;
