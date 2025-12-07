import React, { useState, useMemo } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import TaskModal from "./TaskModal.jsx";
import { useTasks } from "./hooks/useTasks";
import "./CalendarPage.css";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CATEGORY_COLORS = {
  Work: "#3b82f6",
  Personal: "#8b5cf6",
  Study: "#10b981",
  Fitness: "#f97316",
  Other: "#64748b",
};

function CalendarPage() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [animationClass, setAnimationClass] = useState("");

  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Switch Month
  const changeMonth = (dir) => {
    setAnimationClass(dir === "next" ? "slide-left" : "slide-right");

    setTimeout(() => {
      setCurrentDate((prev) => {
        const newDate = new Date(prev);
        newDate.setMonth(prev.getMonth() + (dir === "next" ? 1 : -1));
        return newDate;
      });
      setAnimationClass("");
    }, 400);
  };

  // Build Calendar Grid
  const calendarGrid = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isThisMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isThisMonth: true });
    }

    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, isThisMonth: false });
    }

    return days;
  }, [currentMonth, currentYear]);

  // Click a day
  const openDayTasks = (day) => {
    if (!day.isThisMonth) return;

    const date = new Date(currentYear, currentMonth, day.day);
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const selectedTasks = selectedDate
    ? tasks[selectedDate.toISOString().split("T")[0]] || []
    : [];

  return (
    <div className="app">

      <Header />

      {/* Background Animations SAME AS APP */}
      <div className="glow g1"></div>
      <div className="glow g2"></div>
      <div className="glow g3"></div>
      <div className="glow g4"></div>
      <div className="square small s1"></div>
      <div className="square medium s2"></div>
      <div className="square small s3"></div>
      <div className="square large s4"></div>
      <div className="square medium s5"></div>
      <div className="square small s6"></div>
      <div className="dots"></div>

      {/* CALENDAR PAGE */}
      <div className="calendar-page-wrapper">
        <div className="calendar-container">

          <div className="calendar-header">
            <button className="nav-btn" onClick={() => changeMonth("prev")}>❮</button>
            <h2 className="month-display">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button className="nav-btn" onClick={() => changeMonth("next")}>❯</button>
          </div>

          <div className="calendar-grid weekday-row">
            {weekDays.map((d) => (
              <div key={d} className="weekday-header">{d}</div>
            ))}
          </div>

          <div className={`calendar-grid ${animationClass}`}>
            {calendarGrid.map((day, i) => {
              const isToday =
                day.isThisMonth &&
                day.day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();

              const dateKey = new Date(currentYear, currentMonth, day.day)
                .toISOString()
                .split("T")[0];

              const dots = tasks[dateKey]
                ? [...new Set(tasks[dateKey].map((t) => t.category))]
                : [];

              return (
                <div
                  key={i}
                  className={`date-cell ${day.isThisMonth ? "" : "other-month"} ${
                    isToday ? "today" : ""
                  }`}
                  onClick={() => openDayTasks(day)}
                >
                  <span className="date-number">{day.day}</span>

                  {dots.length > 0 && (
                    <div className="task-indicator">
                      {dots.slice(0, 3).map((c) => (
                        <div
                          key={c}
                          className="task-dot"
                          style={{ background: CATEGORY_COLORS[c] }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <Footer />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(d) => (taskToEdit ? updateTask(selectedDate, d) : addTask(selectedDate, d))}
        onDelete={(id) => deleteTask(selectedDate, id)}
        selectedDate={selectedDate}
        tasksForDate={selectedTasks}
        taskToEdit={taskToEdit}
        setTaskToEdit={setTaskToEdit}
      />

    </div>
  );
}

export default CalendarPage;
