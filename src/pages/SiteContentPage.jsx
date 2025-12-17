import React, {useEffect, useState} from 'react';
import Layout from '../layout/Layout';
import './SiteContentPage.css';
import GeneralSettings from './../components/GeneralSettings';
import HomePageSettings from './../components/HomePageSettings';
import AboutPageSettings from './../components/AboutPageSettings';
import Header from '../components/Header';
import { supabase} from '../Supabase';


const SiteContentPage = () => {
  const [activeTab, setActiveTab] = useState('General'); 
     const [loading, setLoading] = useState(true);
     const [sections, setSections] = useState("");


useEffect(() => {

  async function getAllSectionsAPI() {
    const res = await supabase.from("page_sections").select("*");
    setSections(res.data);
    // console.log(res);
    setLoading(false);
  }

  getAllSectionsAPI();

}, []);

if (loading) {
  return (
    <div className="loading-center">
      <p>Loading...</p>
    </div>
  );
}


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