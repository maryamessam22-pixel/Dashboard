// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Import the forms you just created
// import ExpForm from '../components/experience/ExpForm';
// import SkillsForm from '../components/skills/SkillsForm';

// // We can reuse the main CSS or creating a specific one if needed
// import './SkillsExp.css'; 

// const AddSkillsExp = () => {
//   const navigate = useNavigate();
  
//   // State to track which tab is active: 'experience' or 'skills'
//   const [activeTab, setActiveTab] = useState('experience');

//   return (
//     <div className="page-container">
       
//        {/* 1. Header: Back Button & Save Button */}
//        <div className="header-row">
//           <div className="back-nav" onClick={() => navigate(-1)}>
//              <span className="back-arrow">⬅</span>
//              <h2>Add New Entry</h2>
//           </div>
//           <button className="add-new-btn">💾 Save Entry</button>
//        </div>

//        {/* 2. Tabs: Switch between Experience and Skills */}
//        <div className="tabs-container">
//           <button 
//              className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
//              onClick={() => setActiveTab('experience')}
//           >
//              Experience
//           </button>
//           <button 
//              className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
//              onClick={() => setActiveTab('skills')}
//           >
//              Skills
//           </button>
//        </div>

//        {/* 3. Form Container: Renders the correct form based on activeTab */}
//        <div className="form-wrapper">
//            {activeTab === 'experience' ? <ExpForm /> : <SkillsForm />}
//        </div>

//     </div>
//   );
// };

// export default AddSkillsExp;