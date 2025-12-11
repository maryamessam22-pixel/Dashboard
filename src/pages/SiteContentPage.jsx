import React, { useState } from 'react';
import Layout from '../layout/Layout';
import './SiteContentPage.css';
import GeneralSettings from './../components/GeneralSettings';
import HomePageSettings from './../components/HomePageSettings';
import Header from '../components/Header';

const SiteContentPage = () => {
  const [activeTab, setActiveTab] = useState('General'); 

  return (
    <>
    
      <Layout />
      <div className="site-content-page">
        
        {/* Tabs */}
        
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

        {/* Content Area */}
        <div className="tab-content-area">
          
          {/* عرض General Settings */}
          {activeTab === 'General' && <GeneralSettings />}
          
          {/* عرض Home Page Settings (الجديد) */}
          {activeTab === 'Home' && <HomePageSettings />}
          
          {/* About Placeholder */}
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