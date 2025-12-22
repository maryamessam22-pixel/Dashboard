import React from 'react';
import "./Profile.css";
import Header from '../../layouts/Header';
import DashboardSection from "../../components/dashboard/DashboardSection"; 
import Layout from '../../layouts/Layout';
import ProfileCard from '../../components/common/ProfileCard';


const Profile = () => {
  return (
      <>
<section className='All'>
      <div className="profile-page">
        <Layout />

        <div className="profile-content">
      <Header title="Pages/ Profile" />
      
      <ProfileCard/>
           
         <DashboardSection>
            <input className="input-field" type="text" placeholder="Full Name" />
            <input className="input-field" type="text" placeholder="Job Title" />
            <input className="input-field" type="email" placeholder="Email Address" />
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
      </div>
      </section>
    </>
  );
};

export default Profile;

