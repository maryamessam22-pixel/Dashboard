import React from 'react';
import "./Profile.css";
import Header from './../components/Header';
import Sectionnn from "../components/Sectionnn";
import Layout from '../layout/Layout';

const Profile = () => {
  return (
      <>
<section className='All'>
      <div className="profile-page">
        <Layout />

        <div className="profile-content">
      <Header title="Pages/ Profile" />

          <Sectionnn title="Profile settings">
            <input className="input-field" type="text" placeholder="Full Name" />
            <input className="input-field" type="text" placeholder="Job Title" />
            <input className="input-field" type="email" placeholder="Email Address" />
            <button className="save-btn">Save Changes</button>
          </Sectionnn>

          <Sectionnn title="Contact Information">
            <input className="input-field" type="text" placeholder="LinkedIn" />
            <input className="input-field" type="text" placeholder="Behance" />
            <input className="input-field" type="text" placeholder="Portfolio" />
          </Sectionnn>

          <Sectionnn title="Security">
            <input className="input-field" type="password" placeholder="Current password" />
            <div className="password-row">
              <input className="input-field" type="password" placeholder="New password" />
              <input className="input-field" type="password" placeholder="Confirm password" />
            </div>
          </Sectionnn>

        </div>
      </div>
      </section>
    </>
  );
};

export default Profile;

