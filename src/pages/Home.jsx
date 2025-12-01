import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';
import './Home.css';

const Home = () => {

    return ( <>
<div className="dashboard-layout">
<Sidebar/>
  <main className="main-content">
  {/* Top Header */}
        <header className="top-header">
          <div className="breadcrumbs">Pages / <strong>Dashboard</strong></div>
          <div className="header-actions">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search" />
            </div>
            <div className="notification-icon">🔔<div className="dot"></div></div>
          </div>
        </header>






  </main>
</div>
    
    
    
    </> );
}
 
export default Home;