import React from "react";
import "./Form.css";

const Form = () => {
  return (
    <div className="login-card">
      <h2 className="login-title">Welcome back</h2>
      <p className="login-subtitle">Portfolio Dashboard</p>

      <div className="form-group">
        <input type="email" placeholder="Email" className="login-input" />
      </div>

      <div className="form-group">
        <input type="password" placeholder="Password" className="login-input" />
      </div>

      <div className="options-row">
        <label className="remember-box">
          <input type="checkbox" /> Remember me
        </label>

        <a href="#" className="forgot-link">
          Forgot password?
        </a>
      </div>

      <button className="login-btn">Login</button>
    </div>
  );
};

export default Form;
