import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';
import './Home.css';

const Home = () => {

    return ( <>
<div className="dashboard-layout">
<Sidebar/>
  <main className="main-content">
 
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

   
        <section className="welcome-banner">
          <div className="banner-content">
            <p className="sub-text">Welcome back,</p>
            <h1>Mariam Farid</h1>
            <p className="desc">Here's an overview of your latest activities</p>
          </div>
        </section>





  </main>
</div>
    
    
    
    </> );
}
 
export default Home;