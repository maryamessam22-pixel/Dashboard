import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../config/Supabase";
import "./LoginPage.css";
import "../../components/common/Form.css";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setUpdated(true);
    } catch (updateError) {
      setError(updateError.message || "Unable to update your password. Request a new reset link.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => navigate("/home", { replace: true });

  return (
    <div className="login-background">
      <div className="login-container">
        <form className="login-card" onSubmit={handleSubmit}>
          <h2 className="login-title">
            {updated ? "Password updated" : "Choose a new password"}
          </h2>
          <p className="login-subtitle">
            {updated ? "Your password has been changed. Continue to your dashboard." : "Use at least 8 characters."}
          </p>

          {error && <p className="error-text" role="alert">{error}</p>}

          {updated ? (
            <button className="login-btn" type="button" onClick={handleContinue}>
              Continue to dashboard
            </button>
          ) : (
            <>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="New password"
                  aria-label="New password"
                  className="login-input"
                  value={password}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm new password"
                  aria-label="Confirm new password"
                  className="login-input"
                  value={confirmPassword}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update password"}
              </button>
              <div className="options-row" style={{ marginTop: 20, marginBottom: 0 }}>
                <Link to="/forgot-password" className="forgot-link">Request another link</Link>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
