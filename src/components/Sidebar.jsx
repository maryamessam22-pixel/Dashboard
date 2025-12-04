import React from 'react';
import './Sidebar.css';

import myProfilePic from '../assets/my_pic.png';

import dashboardIcon from '../assets/dashboard.png';
import msgIcon from '../assets/msg.png';
import profileIcon from '../assets/profile.png';
import projectsIcon from '../assets/projects.png';
import skillsIcon from '../assets/skills.png';
import categoriesIcon from '../assets/categories.png';
import logoutIcon from '../assets/logout.png';

import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

  const navigate = useNavigate();   

  // Logout function
  const handleLogout = () => {
   
    navigate("/");  
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="mobile-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

    
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>

        
        <div className="profile-section">
          <div className="profile-img-container">
            <img src={myProfilePic} alt="Profile" className="profile-img" />
          </div>
          <h3 className="profile-name">M.Farid</h3>
          <p className="profile-role">UI/UX Designer</p>
          <div className="divider"></div>
        </div>

        {/* Nav Menu */}
        <nav className="nav-menu">
          <ul>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? 'nav-item active' : 'nav-item'
                }
              >
                <img src={dashboardIcon} className="nav-icon" alt="Dashboard" />
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/messages"
                className={({ isActive }) =>
                  isActive ? 'nav-item active' : 'nav-item'
                }
              >
                <img src={msgIcon} className="nav-icon" alt="Messages" />
                Messages
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? 'nav-item active' : 'nav-item'
                }
              >
                <img src={profileIcon} className="nav-icon" alt="Profile" />
                Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  isActive ? 'nav-item active' : 'nav-item'
                }
              >
                <img src={projectsIcon} className="nav-icon" alt="Projects" />
                Projects
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/skills"
                className={({ isActive }) =>
                  isActive ? 'nav-item active' : 'nav-item'
                }
              >
                <img src={skillsIcon} className="nav-icon" alt="Skills" />
                Skills & Experience
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  isActive ? 'nav-item active' : 'nav-item'
                }
              >
                <img src={categoriesIcon} className="nav-icon" alt="Categories" />
                Categories & Pages
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>
            <img src={logoutIcon} alt="logout" />
            <span>Log out</span>
          </button>
        </div>

      </div>
    </>
  );
};

export default Sidebar;

