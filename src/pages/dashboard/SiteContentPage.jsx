import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '../../layouts/Layout';
import './SiteContentPage.css';
import GeneralSettings from '../../components/settings/GeneralSettings';
import HomePageSettings from '../../components/settings/HomePageSettings';
import AboutPageSettings from '../../components/settings/AboutPageSettings';
import Header from '../../layouts/Header';

const SiteContentPage = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'General';

  return (
    <Layout>
      <div className="site-content-page">
        <Header title="Pages/ Manage Site Content" />

        <div className="content-tabs">
          <Link
            to="?tab=General"
            className={`tab-btn ${activeTab === 'General' ? 'active' : ''}`}
          >
            General Settings
          </Link>

          <Link
            to="?tab=Home"
            className={`tab-btn ${activeTab === 'Home' ? 'active' : ''}`}
          >
            Home Page
          </Link>

          <Link
            to="?tab=About"
            className={`tab-btn ${activeTab === 'About' ? 'active' : ''}`}
          >
            About Page
          </Link>
        </div>

        <div className="tab-content-area">
          {activeTab === 'General' && <GeneralSettings />}
          {activeTab === 'Home' && <HomePageSettings />}
          {activeTab === 'About' && <AboutPageSettings />}
        </div>

      </div>
    </Layout>
  );
};

export default SiteContentPage;