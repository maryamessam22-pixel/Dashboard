// AddSkill.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddEntry.css';

const AddSkill = () => {
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
        <span className="tab" onClick={() => navigate('/add-experience')}>Experience</span>
        <span className="tab active">Skills</span>
      </div>

      {/* Form Content */}
      <div className="form-content">
        
        {/* Row 1: Title */}
        <div className="form-row">
          <div className="form-group">
            <label>Title (EN)</label>
            <input type="text" className="form-input" placeholder="Skills" />
          </div>
          <div className="form-group">
            <label className="text-right">عنوان (AR)</label>
            <input type="text" className="form-input text-right" placeholder="مهاراتي" />
          </div>
        </div>

        {/* Row 2: Subtitle */}
        <div className="form-row">
          <div className="form-group">
            <label>Subtitle (EN)</label>
            <input type="text" className="form-input" placeholder="A Comprehensive Overview..." />
          </div>
          <div className="form-group">
            <label className="text-right">عنوان فرعي (AR)</label>
            <input type="text" className="form-input text-right" placeholder="نظرة شاملة..." />
          </div>
        </div>

        {/* Description EN */}
        <div className="form-group">
          <label>Description (EN)</label>
          <div className="rich-text-container">
            <div className="editor-toolbar">
               <span>↩</span> <span>↪</span> <span>Normal text ⌄</span> <span>B</span> <span>I</span> <span>U</span>
            </div>
            <textarea className="editor-textarea" defaultValue="My core expertise lies in UI/UX design..." />
          </div>
        </div>

        {/* Description AR */}
        <div className="form-group">
          <label className="text-right">الوصف الوظيفي (AR)</label>
          <div className="rich-text-container">
             <div className="editor-toolbar">
               <span>↩</span> <span>↪</span> <span>Normal text ⌄</span> <span>B</span> <span>I</span> <span>U</span>
            </div>
            <textarea className="editor-textarea text-right" defaultValue="تكمن خبرتي الأساسية في..." />
          </div>
        </div>

        {/* Image Uploads */}
        <div className="upload-grid">
           {[1,2,3,4,5,6].map(i => (
             <div key={i} className="upload-box">
                <span className="camera-icon">📷</span>
                <span className="upload-text">Upload Image</span>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
};

export default AddSkill;