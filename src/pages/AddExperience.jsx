// AddExperience.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddEntry.css';
import RichTextEditor from './../components/common/RichTextEditor';

const AddExperience = () => {
  const navigate = useNavigate();

  return (
    <div className="add-entry-container">
      
      {/* Header */}
      <div className="entry-header">
        <div className="header-title">
          <button onClick={() => navigate(-1)} className="back-btn">❮</button> 
          Add New Entry
        </div>
        <button className="save-btn">
          💾 Save Entry
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <span className="tab active">Experience</span>
        <span className="tab" onClick={() => navigate('/add-skill')}>Skills</span>
      </div>

      {/* Form Content */}
      <div className="form-content">
        
        {/* Row 1: Section Title */}
        <div className="form-row">
          <div className="form-group">
            <label>Section Title (EN)</label>
            <input type="text" className="form-input" placeholder="Work Experience" />
          </div>
          <div className="form-group">
            <label className="text-right">عنوان القسم (AR)</label>
            <input type="text" className="form-input text-right" placeholder="خبراتي" />
          </div>
        </div>

        {/* Row 2: Section Subtitle */}
        <div className="form-row">
          <div className="form-group">
            <label>Section subtitle (EN)</label>
            <input type="text" className="form-input" placeholder="Over the years..." />
          </div>
          <div className="form-group">
            <label className="text-right">عنوان فرعي (AR)</label>
            <input type="text" className="form-input text-right" placeholder="على مدار السنوات..." />
          </div>
        </div>

        {/* Row 3: Company */}
        <div className="form-row">
           <div className="form-group">
            <label>Company (EN)</label>
            <input type="text" className="form-input" placeholder="Hany Saad Innovation" />
          </div>
           <div className="form-group">
            <label className="text-right">الشركة (AR)</label>
            <input type="text" className="form-input text-right" placeholder="Hany Saad Innovation" />
          </div>
        </div>

        {/* Row 4: Job Title */}
         <div className="form-row">
           <div className="form-group">
            <label>Job Title (EN)</label>
            <input type="text" className="form-input" placeholder="Graphic Designer" />
          </div>
           <div className="form-group">
            <label className="text-right">المسمى الوظيفي (AR)</label>
            <input type="text" className="form-input text-right" placeholder="مصممة جرافيكس" />
          </div>
        </div>

        {/* Description EN */}
        <div className="form-group">
          <label>Description (EN)</label>
           <div className="rich-text-container">
            <div className="editor-toolbar">
               <span>↩</span> <span>↪</span> <span>Normal text ⌄</span> <span>B</span> <span>I</span> <span>U</span>
            </div>
            <textarea className="editor-textarea" defaultValue="Graphic Designer at Hany Saad Innovations..." />
          </div>
        </div>

        {/* Description AR */}
        <div className="form-group">
          <label className="text-right">الوصف الوظيفي (AR)</label>
           <div className="rich-text-container">
            <div className="editor-toolbar">
               <span>↩</span> <span>↪</span> <span>Normal text ⌄</span> <span>B</span> <span>I</span> <span>U</span>
            </div>
            <textarea className="editor-textarea text-right" defaultValue="عملت كمصممة جرافيك..." />
          </div>
        </div>
        <RichTextEditor/>

      </div>
    </div>
  );
};

export default AddExperience;