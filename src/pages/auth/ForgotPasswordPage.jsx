import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../config/Supabase";
import "./LoginPage.css";
import "../../components/common/Form.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Enter the email address for your dashboard account.");
      return;
    }

    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        { redirectTo: `${window.location.origin}/reset-password` }
      );

      if (resetError) throw resetError;
      setMessage("If an account exists for this email, a password reset link is on its way.");
    } catch (resetError) {
      setError(resetError.message || "Unable to send a password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <form className="login-card" onSubmit={handleSubmit}>
          <h2 className="login-title">Reset your password</h2>
          <p className="login-subtitle">We’ll email you a secure reset link.</p>

          {message && <p role="status">{message}</p>}
          {error && <p className="error-text" role="alert">{error}</p>}

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              className="login-input"
              value={email}
              autoComplete="email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send reset link"}
          </button>
          <div className="options-row" style={{ marginTop: 20, marginBottom: 0 }}>
            <Link to="/" className="forgot-link">Back to login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
