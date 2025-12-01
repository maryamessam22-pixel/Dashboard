import React, { Component } from 'react';
import './Sidebar.css';

// --- IMPORTS ---
// Change '../assets/...' to the actual path where you saved your images
import myProfilePic from '../assets/my_pic.png'; // Your profile picture

import dashboardIcon from '../assets/dashboard.png';
import msgIcon from '../assets/msg.png';
import profileIcon from '../assets/profile.png';
import projectsIcon from '../assets/projects.png';
import skillsIcon from '../assets/skills.png';
import categoriesIcon from '../assets/categories.png';
const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-img-container">
            {/* Using the imported variable for the image source */}
            <img src={myProfilePic} alt="Profile" className="profile-img" />
        </div>
        <h3 className="profile-name">M.Farid</h3>
        <p className="profile-role">UI/UX Designer</p>
        <div className="divider"></div>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        <ul>
          <li className="nav-item active">
            <img src={dashboardIcon} className="nav-icon" alt="Dashboard" />
            Dashboard
          </li>
          <li className="nav-item">
            <img src={msgIcon} className="nav-icon" alt="Messages" />
            Messages
          </li>
          <li className="nav-item">
            <img src={profileIcon} className="nav-icon" alt="Profile" />
            Profile
          </li>
          <li className="nav-item">
            <img src={projectsIcon} className="nav-icon" alt="Projects" />
            Projects
          </li>
          <li className="nav-item">
            <img src={skillsIcon} className="nav-icon" alt="Skills" />
            Skills & Experience
          </li>
          <li className="nav-item">
            <img src={categoriesIcon} className="nav-icon" alt="Categories" />
            Categories & Pages
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="logout-section">
        <button className="logout-btn">
          {/* You can also use an image for the logout icon if you have one */}
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;