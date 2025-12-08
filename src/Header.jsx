import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./assets/logo.png";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar">

        <img className="logo" src={logo} alt="Logo" />

        {/* Desktop Navigation */}
        <ul className="nav-links desktop-nav">
          <li><Link to="/app">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/app">To-Do</Link></li>
          <li><Link to="/calendar">Calendar</Link></li>
          <li><Link to="/progress">Progress</Link></li>
        </ul>

        {/* Hamburger Menu (Mobile only) */}
        <div className="hamburger" onClick={() => setOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

      </nav>

      {/* Mobile Slide Menu */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {/* Back Arrow */}
        <div className="mobile-menu-header" onClick={() => setOpen(false)}>
          <div className="back-arrow"></div>
          <span>Back</span>
        </div>

        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
        <Link to="/app" onClick={() => setOpen(false)}>To-Do List</Link>
        <Link to="/calendar" onClick={() => setOpen(false)}>Calendar</Link>
        <Link to="/progress" onClick={() => setOpen(false)}>Progress</Link>
      </div>
    </>
  );
}

export default Header;
