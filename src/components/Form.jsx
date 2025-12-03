import React, { useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Validation: both required
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Optional: fixed login (you can remove this)
    if (email !== "admin@gmail.com" || password !== "123456") {
      setError("Invalid email or password.");
      return;
    }

    navigate("/home");  
  };

  return (
    <div className="login-card">
      <h2 className="login-title">Welcome back</h2>
      <p className="login-subtitle">Portfolio Dashboard</p>

      {/* Error message */}
      {error && <p className="error-text">{error}</p>}

      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="options-row">
        <label className="remember-box">
          <input type="checkbox" /> Remember me
        </label>

        <a href="#" className="forgot-link">Forgot password?</a>
      </div>

      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Form;


