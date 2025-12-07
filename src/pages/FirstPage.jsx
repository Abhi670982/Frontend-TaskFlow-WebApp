import { useNavigate } from "react-router-dom";
import "./FirstPage.css";
import Header from "../Header.jsx";
import Footer from "../Footer.jsx";

function FirstPage() {
  const navigate = useNavigate();

  const goToApp = () => {
    navigate("/app");   // ⭐ This will open the App page
  };

  return (
    <div className="firstpage-container">
      <Header />

      <div className="hero">
        <h1>Organize. Track. Achieve.</h1>
        <p>
          TaskFlow helps you manage your projects and daily tasks with ease. <br />
          Stay focused, collaborate seamlessly, and get more done — all in one place.
        </p>

        <button className="btn" onClick={goToApp}>
          Get Started Now
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default FirstPage;