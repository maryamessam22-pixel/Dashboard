import React, { useState } from 'react';
import Layout from '../layout/Layout';
import './SiteContentPage.css';
import GeneralSettings from './../components/GeneralSettings';
import HomePageSettings from './../components/HomePageSettings';
import AboutPageSettings from './../components/AboutPageSettings';
import Header from '../components/Header';


const SiteContentPage = () => {
  const [activeTab, setActiveTab] = useState('General'); 

  return (
    <>
      <Layout />
      <div className="site-content-page">
        <Header title="Pages/ Manage Site Content" />
 
        <div className="content-tabs">
          <button 
            className={`tab-btn ${activeTab === 'General' ? 'active' : ''}`}
            onClick={() => setActiveTab('General')}
          >
            General Settings
          </button>
          
          <button 
            className={`tab-btn ${activeTab === 'Home' ? 'active' : ''}`}
            onClick={() => setActiveTab('Home')}
          >
            Home Page
          </button>
          
          <button 
            className={`tab-btn ${activeTab === 'About' ? 'active' : ''}`}
            onClick={() => setActiveTab('About')}
          >
            AboutPage
          </button>
        </div>

      
        <div className="tab-content-area">
          
          {activeTab === 'General' && <GeneralSettings/>} 
          {activeTab === 'Home' && <HomePageSettings />}
          {activeTab === 'About' && <AboutPageSettings />}
          
        </div>

      </div>
    </>
  );
};

export default SiteContentPage;