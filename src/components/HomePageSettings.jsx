import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Correct Import
import './HomePageSettings.css'; 
import RichTextEditor from './common/RichTextEditor'; // Adjusted path based on previous structure

const HomePageSettings = () => {
  // 2. Initialize Navigation Hook
  const navigate = useNavigate();

  // State for Toggles
  const [showCategories, setShowCategories] = useState(true);
  const [showSkills, setShowSkills] = useState(true);

  return (
    <div className="settings-form-container">
      
      {/* ================= HERO SECTION ================= */}
      <section className="form-section">
        <h3 className="section-title">Hero Section</h3>
        
        <div className="hero-grid">
          {/* Left: Upload Image */}
          <div className="hero-image-upload">
            <div className="upload-placeholder">
              <span className="camera-icon">📷</span>
              <span>Upload Hero Image</span>
            </div>
          </div>

          {/* Right: Inputs */}
          <div className="hero-inputs">
            <div className="form-group">
                <label>Greeting Text (EN)</label>
                <input type="text" className="std-input" placeholder="Hello, I'm..." />
            </div>
            <div className="form-group">
                <label className="text-right">جملة الترحيب (AR)</label>
                <input type="text" className="std-input text-right" placeholder="مرحباً، أنا..." />
            </div>
            
            <div className="form-row">
                <div className="form-group half-width">
                    <label>Job Title (EN)</label>
                    <input type="text" className="std-input" />
                </div>
                <div className="form-group half-width">
                    <label className="text-right">عنوان (AR)</label>
                    <input type="text" className="std-input text-right" />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group half-width">
                    <label>Name (EN)</label>
                    <input type="text" className="std-input" />
                </div>
                <div className="form-group half-width">
                    <label className="text-right">الاسم (AR)</label>
                    <input type="text" className="std-input text-right" />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="form-section">
        <h3 className="section-title">About Section</h3>
        
        <div className="about-grid">
            {/* Left: Content */}
            <div className="about-inputs">
                <div className="form-group">
                    <label>Title (EN)</label>
                    <input type="text" className="std-input" />
                </div>
                <div className="form-group">
                    <label className="text-right">عنوان (AR)</label>
                    <input type="text" className="std-input text-right" />
                </div>

                <div className="form-group">
                    <label>Description (EN)</label>
                    <RichTextEditor placeholder="Write about yourself..." />
                </div>

                <div className="form-group">
                    <label className="text-right">الوصف (AR)</label>
                    <div dir="rtl">
                        <RichTextEditor placeholder="اكتب نبذة عنك..." />
                    </div>
                </div>

                {/* Upload CV Button */}
                <button className="upload-cv-btn">
                    <span>📄</span> Upload CV File (PDF)
                </button>
            </div>

            {/* Right: Image */}
            <div className="hero-image-upload about-img-height">
                <div className="upload-placeholder">
                    <span className="camera-icon">📷</span>
                    <span>Upload Hero Image</span>
                </div>
            </div>
        </div>
      </section>

      {/* ================= CONFIGURATION ================= */}
      
      {/* Category Config */}
      <section className="config-box">
        <div className="config-header">
            <h4>Category Section Configuration</h4>
            <div className="toggle-wrapper">
                <span>Show Categories on Home page</span>
                <label className="switch">
                    <input 
                        type="checkbox" 
                        checked={showCategories} 
                        onChange={() => setShowCategories(!showCategories)} 
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
        <div className="config-content">
            <p>To add or edit specific Category go to skills page.</p>
            {/* 3. Added Navigation to Categories */}
            <button 
                className="manage-btn" 
                onClick={() => navigate('/categories')}
            >
                Manage Categories List ↗
            </button>
        </div>
      </section>

      {/* Skills Config */}
      <section className="config-box">
        <div className="config-header">
            <h4>Skills Section Configuration</h4>
            <div className="toggle-wrapper">
                <span>Show Skills on Home page</span>
                <label className="switch">
                    <input 
                        type="checkbox" 
                        checked={showSkills} 
                        onChange={() => setShowSkills(!showSkills)} 
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
        <div className="config-content">
            <p>To add or edit specific Skill go to skills page.</p>
            {/* 4. Added Navigation to Skills Exp */}
            <button 
                className="manage-btn" 
                onClick={() => navigate('/skills-exp')}
            >
                Manage Skills List ↗
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

export default HomePageSettings;