import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Home.css';


import Img1 from "../assets/1.png";
import Img2 from "../assets/2.png";
import Img3 from "../assets/3.png";
import Img4 from "../assets/4.png";
import Img5 from "../assets/5.png";
import Img6 from "../assets/6.png";
import Layout from "../layout/Layout";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Line as ReLine } from 'recharts';
import Header from './../components/Header';


const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const data = [
    { name: 'Nov 1', uv: 400, pv: 240, amt: 2400 },
    { name: 'Nov 5', uv: 300, pv: 456, amt: 2400 },
    { name: 'Nov 6', uv: 300, pv: 139, amt: 2400 },
    { name: 'Nov 9', uv: 200, pv: 980, amt: 2400 },
    { name: 'Nov 11', uv: 278, pv: 390, amt: 2400 },
  ];

  return (
    <div className="home-page dashboard-layout">

      {/* Sidebar */}
   <Layout/>

      {/* Main Content */}
      <main className="main-content">

        {/* Mobile Toggle Button */}
        {/* <button 
          className="mobile-toggle" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button> */}

        {/* Header */}
          <Header title="Pages/ Dashboard" />

        {/* Welcome Banner */}
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
            <div className="stat-card">
              <div className="icon-box yellow">⬇</div>
              <div className="stat-info">
                <h3>CV DOWNLOADS</h3>
                <p><span className="highlight-yellow">6 download</span> your cv</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="icon-box green">📦</div>
              <div className="stat-info">
                <h3>PROJECT</h3>
                <p><span className="highlight-green">4 project</span> last update</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="icon-box blue">👁</div>
              <div className="stat-info">
                <h3>VIEWS</h3>
                <p><span className="highlight-blue">50 views</span> you projects</p>
              </div>
            </div>
          </div>

          <div className="inbox-alert">
            <div className="icon-box pink">✉</div>
            <div className="stat-info">
              <h3>INBOX MESSAGES</h3>
              <p><span className="highlight-pink">3 unread messages</span> from contact form</p>
            </div>
          </div>
        </section>

        {/* Traffic Chart */}
        <section className="traffic-section">
          <div className="section-header">
            <h2>Traffic overview</h2>
            <div className="chart-legend">
              <span className="dot green"></span> Organic Search
              <span className="dot blue"></span> Direct
              <span className="dot red"></span> Referral
            </div>
            <button className="date-filter">Last 30 Days</button>
          </div>

          <LineChart style={{ width: '100%', aspectRatio: 3, maxWidth: 1200, margin: 'auto' }} data={data}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis width="auto" />
            <ReLine type="monotone" dataKey="uv" stroke="#8884d8" />
            <ReLine type="monotone" dataKey="pv" stroke="#82ca9d" />
          </LineChart>
        </section>

        {/* Most Viewed Projects */}
        <section className="projects-section">
          <h2>Most Viewed Projects</h2>
          <div className="projects-grid">

            {/* Card 1 */}
            <div className="project-card purple-light">
              <div className="card-header">
                <span className="badge">Web Design</span>
                <span className="date">📅 March 13</span>
              </div>
              <h4>Web Design "Horror Website" Process of full product</h4>
              <div className="card-images">
                <img src={Img1} alt="project img 1" className="img-placeholder" />
                <img src={Img2} alt="project img 2" className="img-placeholder" />
              </div>
              <div className="card-footer">
                <span>🕒 8 📎 4</span>
                <div className="avatars">👥+3</div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="project-card purple-medium">
              <div className="card-header">
                <span className="badge">UI/UX Design</span>
                <span className="date">📅 August 12</span>
              </div>
              <h4>Overall UX Car Screen Process of full product for first version</h4>
              <div className="card-images">
                <img src={Img3} alt="project img 3" className="img-placeholder" />
                <img src={Img4} alt="project img 4" className="img-placeholder" />
              </div>
              <div className="card-footer">
                <span>🕒 8 📎 4</span>
                <div className="avatars">👥+9</div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="project-card purple-medium">
              <div className="card-header">
                <span className="badge">Mobile App</span>
                <span className="date">📅 January 1</span>
              </div>
              <h4>Mobile App Process of full product for first version</h4>
              <div className="card-images">
                <img src={Img5} alt="project img 5" className="img-placeholder" />
                <img src={Img6} alt="project img 6" className="img-placeholder" />
              </div>
              <div className="card-footer">
                <span>🕒 8 📎 4</span>
                <div className="avatars">👥+6</div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;
