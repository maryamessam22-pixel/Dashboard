import React, { Component } from 'react';
import './Sidebar.css';

import myProfilePic from '../assets/my_pic.png'; 

import dashboardIcon from '../assets/dashboard.png';
import msgIcon from '../assets/msg.png';
import profileIcon from '../assets/profile.png';
import projectsIcon from '../assets/projects.png';
import skillsIcon from '../assets/skills.png';
import categoriesIcon from '../assets/categories.png';
const Sidebar = () => {
  return (
    <div className="sidebar">
      
      <div className="profile-section">
        <div className="profile-img-container">
       
            <img src={myProfilePic} alt="Profile" className="profile-img" />
        </div>
        <h3 className="profile-name">M.Farid</h3>
        <p className="profile-role">UI/UX Designer</p>
        <div className="divider"></div>
      </div>


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

   
      <div className="logout-section">
        <button className="logout-btn">
        
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;