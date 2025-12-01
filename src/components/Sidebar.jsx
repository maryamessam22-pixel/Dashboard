import React, { Component } from 'react';
import './Sidebar.css';
// Note: In a real app, import icons from react-icons (e.g., FiHome, FiMessageSquare)
// For this code, I will use text placeholders or standard HTML elements for simplicity.

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-img-container">
            {/* Replace src with your actual image */}
            <img src="https://via.placeholder.com/80" alt="Profile" className="profile-img" />
        </div>
        <h3 className="profile-name">M.Farid</h3>
        <p className="profile-role">UI/UX Designer</p>
        <div className="divider"></div>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        <ul>
          <li className="nav-item active">
            <span className="icon">dashboard</span>
            Dashboard
          </li>
          <li className="nav-item">
            <span className="icon">mail</span>
            Messages
          </li>
          <li className="nav-item">
            <span className="icon">person</span>
            Profile
          </li>
          <li className="nav-item">
            <span className="icon">folder</span>
            Projects
          </li>
          <li className="nav-item">
            <span className="icon">star</span>
            Skills & Experience
          </li>
          <li className="nav-item">
            <span className="icon">grid</span>
            Categories & Pages
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="logout-section">
        <button className="logout-btn">
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;