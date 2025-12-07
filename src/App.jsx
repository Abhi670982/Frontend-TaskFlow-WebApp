import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

// Card and structural components
import TodoListCard from "./TodoListCard";
import CalendarCard from "./CalendarCard";
import ProgressCard from "./ProgressCard";
import Footer from "./Footer";
import Header from "./Header";

// Page components
import FirstPage from "./pages/FirstPage";
import CalendarPage from "./pages/CalendarPage";
import ProgressPage from "./pages/ProgressPage";
import TodoListPage from "./pages/TodoListPage";
import Login from "./Login";

// Asset imports for mobile buttons
import todoIcon from "/todolistimg.png";
import calendarIcon from "/calendar.jpg";
import progressIcon from "/CardThreeImage.png";

// Custom hooks
import useMediaQuery from "./hooks/useMediaQuery";

const AnimatedDots = () => (
  <div className="dots-container">
    {Array.from({ length: 30 }).map((_, i) => (
      <div key={i} className="dot" />
    ))}
  </div>
);

function App() {
  const [mobileOpen, setMobileOpen] = useState(null);
  const carouselRef = useRef(null);

  // Media query hooks
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(min-width: 601px) and (max-width: 1024px)");

  const navigate = useNavigate();
  const handleProgress = () => navigate('/progress');
  const handleViewCalendar = () => navigate('/calendar');

  // Prevent background scroll when a mobile card is open
  useEffect(() => {
    if (isMobile && mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, mobileOpen]);

  // Close mobile view if user resizes to desktop
  useEffect(() => {
    if (!isMobile && mobileOpen) setMobileOpen(null);
  }, [isMobile, mobileOpen]);

  const handleMobileOpen = (card) => setMobileOpen(card);
  const handleMobileClose = () => setMobileOpen(null);

  // Carousel scroll handlers
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const renderMobileContent = () => {
    if (mobileOpen) {
      return (
        <div className="mobile-card-view" role="region" aria-live="polite" tabIndex={-1}>
          {mobileOpen === "todo" && <TodoListCard onClose={handleMobileClose} />}
          {mobileOpen === "calendar" && <CalendarCard onClose={handleMobileClose} />}
          {mobileOpen === "progress" && <ProgressCard onClose={handleMobileClose} />}
        </div>
      );
    }
    return (
      <div className="mobile-features-options">
        <button className="mobile-feature-button" onClick={() => handleMobileOpen("todo")}>
          <img src={todoIcon} alt="To-do" className="mobile-button-icon" /> To-Do List
        </button>
        <button className="mobile-feature-button" onClick={handleViewCalendar}>
          <img src={calendarIcon} alt="Calendar" className="mobile-button-icon" /> Schedule Tasks
        </button>
        <button className="mobile-feature-button" onClick={handleProgress}>
          <img src={progressIcon} alt="Progress" className="mobile-button-icon" /> Track Progress
        </button>
      </div>
    );
  };

  const renderTabletContent = () => (
    <div className="tablet-carousel-wrapper">
      <button onClick={() => scrollCarousel("prev")} className="carousel-arrow prev" aria-label="Previous card">&lt;</button>
      <div className="tablet-carousel-container" ref={carouselRef}>
        <div className="tablet-carousel-slide"><TodoListCard /></div>
        <div className="tablet-carousel-slide"><CalendarCard /></div>
        <div className="tablet-carousel-slide"><ProgressCard /></div>
      </div>
      <button onClick={() => scrollCarousel("next")} className="carousel-arrow next" aria-label="Next card">&gt;</button>
    </div>
  );

  const renderDesktopContent = () => (
    <>
      <TodoListCard />
      <CalendarCard />
      <ProgressCard />
    </>
  );

  const renderContent = () => {
    if (isMobile) return renderMobileContent();
    if (isTablet) return renderTabletContent();
    return renderDesktopContent();
  };

  return (
    <div className="app">
      {/* Background Animations */}
      <AnimatedDots />
      <div className="glow g1"></div>
      <div className="glow g2"></div>
      <div className="glow g3"></div>
      <div className="glow g4"></div>
      <div className="square small s1"></div>
      <div className="square medium s2"></div>
      <div className="square large s3"></div>
      <div className="square medium s4"></div>
      <div className="square small s5"></div>
      <div className="square large s6"></div>
      <div className="square small s15"></div>
      <div className="square medium s16"></div>
      <div className="square large s17"></div>
      <div className="square small s18"></div>
      <div className="square medium s19"></div>
      <div className="square large s20"></div>
      <div className="square small s21"></div>
      <div className="square medium s22"></div>
      <div className="square large s23"></div>
      <div className="square small s24"></div>
      <div className="square medium s25"></div>
      <div className="square large s26"></div>

      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route
          path="/app"
          element={
            <>
              <Header />
              <main className="features-section">{renderContent()}</main>
              <Footer />
            </>
          }
        />
        <Route path="/todo" element={<TodoListPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
