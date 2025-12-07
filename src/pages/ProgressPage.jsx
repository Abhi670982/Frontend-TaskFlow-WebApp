import React from "react";
import Header from "../Header";
import { useTasks } from "../hooks/useTasks";
import useMediaQuery from "../hooks/useMediaQuery"; // Import the new hook

// Progress Components
import DailyProgressRing from "../components/progress/DailyProgressRing";
import TaskBreakdown from "../components/progress/TaskBreakdown";
import WeeklyAnalysis from "../components/progress/WeeklyAnalysis";
import MonthlyHeatmap from "../components/progress/MonthlyHeatmap";
import MonthlySummary from "../components/progress/MonthlySummary";
import Achievements from "../components/progress/Achievements";
import ProductivityInsights from "../components/progress/ProductivityInsights";
import MotivationalQuotes from "../components/progress/MotivationalQuotes";
import ProgressFooter from '../components/progress/ProgressFooter'; // Use ProgressFooter
// Analytics Hooks
import { useTaskAnalytics } from "../hooks/useTaskAnalytics";
import { useAchievements } from "../hooks/useAchievements";

import "./ProgressPage.css";

// Animation components for better readability
const BackgroundAnimations = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  // Render fewer squares on mobile for performance and visual clarity
  const mobileSquares = (
    <>
      <div className="square small s15"></div>
      <div className="square medium s16"></div>
      <div className="square large s17"></div>
      <div className="square small s25"></div>
      <div className="square medium s26"></div>
      <div className="square large s27"></div>
      <div className="square medium s31"></div>
      <div className="square large s32"></div>
      <div className="square small s39"></div>
      <div className="square medium s40"></div>
    </>
  );

  const desktopSquares = (
    <>
      {mobileSquares} {/* Include mobile squares on desktop too */}
      <div className="square small s18"></div>
      <div className="square medium s19"></div>
      <div className="square small s28"></div>
      <div className="square medium s29"></div>
      <div className="square small s30"></div>
      <div className="square small s33"></div>
      <div className="square medium s34"></div>
      <div className="square large s35"></div>
      <div className="square small s36"></div>
      <div className="square medium s37"></div>
      <div className="square large s38"></div>
      <div className="square large s41"></div>
      <div className="square medium s42"></div>
      <div className="square small s43"></div>
      <div className="square large s44"></div>
    </>
  );

  return (
    <>
      {/* Base Animations */}
      <div className="glow g1"></div>
      <div className="glow g2"></div>
      <div className="glow g3"></div>
      <div className="glow g4"></div>

      <div className="square small s1"></div>
      <div className="square medium s2"></div>
      <div className="square large s3"></div>

      <div className="dots"></div>

      {/* EXTRA Progress Page Animations */}
      <div className="progress-page-animations">
        {isMobile ? mobileSquares : desktopSquares}
        {/* Glows */}
        <div className="glow g9"></div>
        <div className="glow g10"></div>
        <div className="glow g11"></div>
        <div className="glow g12"></div>
        <div className="glow g13"></div>
      </div>
    </>
  );
};


function ProgressPage() {
  const { dailyProgress, tasksToday, allTasks } = useTasks();
  
  // Safe initial values
  let weeklyAnalysis = [];
  let monthlyHeatmap = {};
  let monthlySummary = [];
  let achievements = [];

  try {
    const analytics = useTaskAnalytics(allTasks);
    weeklyAnalysis = analytics.weeklyAnalysis;
    monthlyHeatmap = analytics.monthlyHeatmap;
    monthlySummary = analytics.monthlySummary;

    achievements = useAchievements(allTasks);
  } catch (err) {
    console.error("Analytics Hook Error:", err);
  }

  return (
    <div className="app">
      <Header />
      <BackgroundAnimations />

      {/* Progress Content */}
      <main className="features-section progress-page-layout">
        <div className="progress-grid">
          
          <div className="grid-item daily-progress">
            <DailyProgressRing percentage={dailyProgress} />
            <TaskBreakdown
              completed={tasksToday?.completed}
              pending={tasksToday?.pending}
            />
          </div>

          <div className="grid-item weekly-analysis">
            <WeeklyAnalysis data={weeklyAnalysis} />
          </div>

          <div className="grid-item monthly-heatmap">
            <MonthlyHeatmap data={monthlyHeatmap} />
          </div>

          <div className="grid-item monthly-summary">
            <MonthlySummary data={monthlySummary} />
          </div>

          <div className="grid-item achievements">
            <Achievements achievements={achievements} />
          </div>

          <div className="grid-item productivity-insights">
            <ProductivityInsights tasks={allTasks} />
          </div>

          <div className="grid-item motivational-quotes">
            <MotivationalQuotes />
          </div>

        </div>
      </main>

      <ProgressFooter />
    </div>
  );
}

export default ProgressPage;
