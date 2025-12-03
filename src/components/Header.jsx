import React, { Component } from 'react';
import SearchImg from "../assets/search.png";
import BellImg from "../assets/bell.png";
import "./Header.css";


const Header = () => {
  return (
    <>
      <header className="top-header">
        <div className="breadcrumbs">
          Pages / <strong>Dashboard</strong>
        </div>

        <div className="header-actions">
          <div className="search-bar">
            <img src={SearchImg} alt="search icon" style={{ width: "16px", height: "16px" }} />
            <input type="text" placeholder="Search" />
          </div>

          <div className="notification-icon">
            <img src={BellImg} alt="bell icon" style={{ width: "20px", height: "20px" }} />
            <div className="dot"></div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
