// src/components/site-content/AboutPageSettings.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutPageSettings.css'; 
import RichTextEditor from '../common/RichTextEditor'; 

const AboutPageSettings = () => {
  const navigate = useNavigate();
  
  // State for Toggle
  const [showExperience, setShowExperience] = useState(true);

  return (
    <div className="settings-form-container">
      
      {/* ================= PERSONAL INFO SECTION ================= */}
      <section className="form-section">
        <h3 className="section-title">Personal Info</h3>
        
        <div className="hero-grid">
          {/* Left: Upload Image */}
          <div className="hero-image-upload">
            <div className="upload-placeholder">
              <span className="camera-icon">📷</span>
              <span>Upload Logo (Light)</span>
            </div>
          </div>

          {/* Right: Inputs */}
          <div className="hero-inputs">
            <div className="form-group">
                <label>Section Title (EN)</label>
                <input type="text" className="std-input" />
            </div>
            <div className="form-group">
                <label className="text-right">عنوان القسم (AR)</label>
                <input type="text" className="std-input text-right" />
            </div>
            
            <div className="form-group">
                <label>Heading (EN)</label>
                <input type="text" className="std-input" />
            </div>
            <div className="form-group">
                <label className="text-right">اسم الموقع (AR)</label>
                <input type="text" className="std-input text-right" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= BIO SECTION ================= */}
      <section className="form-section">
        <div className="form-group">
            <label>Bio (EN)</label>
            <RichTextEditor placeholder="Write your bio here..." />
        </div>
        
        <div className="form-group" style={{marginTop: '20px'}}>
            <label className="text-right">من أنا (AR)</label>
            <div dir="rtl">
                <RichTextEditor placeholder="اكتب نبذة عنك..." />
            </div>
        </div>
      </section>

      {/* ================= EDUCATION SECTION ================= */}
      <section className="form-section">
        <h3 className="section-title">Education Section</h3>
        
        <div className="form-row">
            <div className="form-group half-width">
                <label>Section Title (EN)</label>
                <input type="text" className="std-input" />
            </div>
            <div className="form-group half-width">
                <label className="text-right">عنوان القسم (AR)</label>
                <input type="text" className="std-input text-right" />
            </div>
        </div>

        <div className="form-group" style={{marginTop: '15px'}}>
            <label>Bio (EN)</label>
            <RichTextEditor placeholder="Education details..." />
        </div>

        <div className="form-group" style={{marginTop: '20px'}}>
            <label className="text-right">من أنا (AR)</label>
            <div dir="rtl">
                <RichTextEditor placeholder="تفاصيل التعليم..." />
            </div>
        </div>
      </section>

      {/* ================= EXPERIENCE CONFIGURATION ================= */}
      <section className="config-box">
        <div className="config-header">
            <h4>Experience Section Configuration</h4>
            <div className="toggle-wrapper">
                <span>Show Experience on About page</span>
                <label className="switch">
                    <input 
                        type="checkbox" 
                        checked={showExperience} 
                        onChange={() => setShowExperience(!showExperience)} 
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
        <div className="config-content">
            <p>To add or edit specific Experience go to skills page.</p>
            {/* Button navigates to Skills & Experience page */}
            <button 
                className="manage-btn" 
                onClick={() => navigate('/skills-exp')}
            >
                Manage Experience List ↗
            </button>
        </div>
      </section>

      {/* Buttons */}
      <div className="form-actions">
        <button className="btn-cancel">Cancel</button>
        <button className="btn-save">Save changes</button>
      </div>

    </div>
  );
};

export default AboutPageSettings;