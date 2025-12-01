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


        {/* Overview Stats */}
        <section className="overview-section">
          <h2>Overview <span className="date-tag">Last 7 days</span></h2>
          
          <div className="stats-grid">
            {/* Card 1 */}
            <div className="stat-card">
              <div className="icon-box yellow">⬇</div>
              <div className="stat-info">
                <h3>CV DOWNLOADS</h3>
                <p><span className="highlight-yellow">6 download</span> your cv</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="stat-card">
              <div className="icon-box green">📦</div>
              <div className="stat-info">
                <h3>PROJECT</h3>
                <p><span className="highlight-green">4 project</span> last update</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="stat-card">
              <div className="icon-box blue">👁</div>
              <div className="stat-info">
                <h3>VIEWS</h3>
                <p><span className="highlight-blue">50 views</span> you projects</p>
              </div>
            </div>
          </div>

          {/* Inbox Alert */}
          <div className="inbox-alert">
             <div className="icon-box pink">✉</div>
             <div className="stat-info">
                <h3>INBOX MESSAGES</h3>
                <p><span className="highlight-pink">3 unread messages</span> from contact form</p>
             </div>
          </div>
        </section>



  </main>
</div>
    
    
    
    </> );
}
 
export default Home;