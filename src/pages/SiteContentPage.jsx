
import React, { useState } from 'react';
import Layout from '../layout/Layout'; 

import './SiteContentPage.css'; 
import GeneralSettings from './../components/GeneralSettings';


const SiteContentPage = () => {
  const [activeTab, setActiveTab] = useState('General');

  return (
    <>
      <Layout />
      
      <div className="site-content-page">
        
     
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
          {activeTab === 'General' && <GeneralSettings />}
          
          {activeTab === 'Home' && (
            <div style={{textAlign: 'center', marginTop: '50px', color: '#888'}}>
              <h2>Home Page Settings</h2>
              <p>Coming Soon...</p>
            </div>
          )}
          
          {activeTab === 'About' && (
             <div style={{textAlign: 'center', marginTop: '50px', color: '#888'}}>
              <h2>About Page Settings</h2>
              <p>Coming Soon...</p>
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default SiteContentPage;