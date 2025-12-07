import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onClose }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Mobile-only Back Arrow */}
      <div className="login-back-arrow" onClick={handleBack}></div>

      {/* ✨ Background Animations from TaskFlow */}
      <div className="glow g1"></div>
      <div className="glow g2"></div>
      <div className="glow g3"></div>
      <div className="glow g4"></div>
      <div className="glow g5"></div>

      <div className="square small s1"></div>
      <div className="square medium s2"></div>
      <div className="square large s3"></div>
      <div className="square medium s4"></div>
      <div className="square small s5"></div>

      <div className="dots"></div>

      {/* ✨ Login Form */}
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <h2 className="form-title">Student Login</h2>

        <input type="text" placeholder="Username" required />
        <input type="text" placeholder="Course" required />
        <input type="text" placeholder="Batch" required />
        <input type="password" placeholder="Password" required />

        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
