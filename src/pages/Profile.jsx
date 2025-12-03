import React from 'react';
import Layout from '../layout/Layout';
import Header from './../components/Header';
import Section from '../components/Sectionnn';

const Profile = () => {
  return (
    <>
     

      <Layout/>

        {/* SECTION 1 */}
 <Header title="Pages/ Profile" />
        <Section title="Profile settings">
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Job Title" />
          <input type="email" placeholder="Email Address" />

          <button className="save-btn">Save Changes</button>

        </Section>

        {/* SECTION 2 */}
        <Section title="Contact Information">

          <input type="text" placeholder="LinkedIn" />
          <input type="text" placeholder="Behance" />
          <input type="text" placeholder="Portfolio" />

        </Section>

        {/* SECTION 3 */}
        <Section title="Security">

          <input type="password" placeholder="Current password" />

          <div style={{ display: "flex", gap: "20px" }}>
            <input type="password" placeholder="New password" />
            <input type="password" placeholder="Confirm password" />
          </div>

        </Section>

 
    </>
  );
};

export default Profile;
