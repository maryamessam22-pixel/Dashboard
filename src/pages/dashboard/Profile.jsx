import React from 'react';
import "./Profile.css";
import Header from '../../layouts/Header';
// Assuming Sectionnn was a generic section component, mapping to DashboardSection or similar if renamed. 
// If specific file exists, path would be ../../components/dashboard/Sectionnn (or whatever new name)
// For now, I'll assume it might be 'DashboardSection' based on your structure or kept as a component.
import DashboardSection from "../../components/dashboard/DashboardSection"; 
import Layout from '../../layouts/Layout';
import ProfileCard from '../../components/common/ProfileCard';

const Profile = () => {
  return (
      <>
    <div className="profile-page">
        <Layout>
        <div className="profile-content">
          <Header title="Pages/ Profile" />
          
          <ProfileCard/>
              
              <DashboardSection title="Profile settings">
                <input className="input-field" type="text" placeholder="Full Name" />
                <input className="input-field" type="text" placeholder="Job Title" />
                <input className="input-field" type="email" placeholder="Email Address" />
                {/* <button className="save-btn">Save Changes</button> */}
              </DashboardSection>

              <DashboardSection title="Contact Information">
                <input className="input-field" type="text" placeholder="LinkedIn" />
                <input className="input-field" type="text" placeholder="Behance" />
                <input className="input-field" type="text" placeholder="Portfolio" />
              </DashboardSection>


              <DashboardSection title="Security">
                <input className="input-field" type="password" placeholder="Current password" />
                <div className="password-row">
                  <input className="input-field" type="password" placeholder="New password" />
                  <input className="input-field" type="password" placeholder="Confirm password" />
                </div>
              </DashboardSection>

        </div>
        </Layout>
      </div>
    </>
  );
};

export default Profile;