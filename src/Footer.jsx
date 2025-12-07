import "./Footer.css";

function Footer() {
  return (
    <footer className="tf-footer">

      <div className="tf-footer-content">

        {/* Brand Section */}
        <div className="tf-footer-col brand">
          <h2 className="tf-footer-title">TaskFlow</h2>
          <p className="tf-footer-text">
            “The smartest way to manage your day. <br />
            Your tasks, your schedule, your flow.”
          </p>
        </div>

        {/* Quick Links */}
        <div className="tf-footer-col">
          <h3 className="tf-footer-heading">Quick Links</h3>
          <ul>
            <li><a href="/app">Home</a></li>
            <li><a href="/calendar">Calendar</a></li>
            <li><a href="/progress">Progress</a></li>
            <li><a href="/todo">To-Do List</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="tf-footer-col">
          <h3 className="tf-footer-heading">Services</h3>
          <ul>
            <li>Task Management</li>
            <li>Smart Reminders</li>
            <li>Productivity Insights</li>
            <li>Progress Tracking</li>
            <li>Streak System</li>
            <li>UI/UX Smart Layouts</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="tf-footer-col">
          <h3 className="tf-footer-heading">Contact Info</h3>
          <p className="tf-footer-email">taskflow.app@gmail.com</p>
          <p className="tf-footer-location">New Delhi, India</p>
        </div>

      </div>

      {/* Bottom line */}
      <div className="tf-footer-bottom">
        <hr />
        <p>© 2025 TaskFlow. All rights reserved  |   <span>Build with ❤️ by ABHISHEK CHAUHAN</span></p>
      </div>

    </footer>
  );
}

export default Footer;
