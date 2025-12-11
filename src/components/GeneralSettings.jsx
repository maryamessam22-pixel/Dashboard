import React from 'react';
import './GeneralSettings.css';

const GeneralSettings = () => {
  return (
    <div className="settings-form-container">
      
 
      <section className="form-section">
        <h3 className="section-title">Site Identity</h3>
        
        <div className="identity-grid">
        
          <div className="logos-wrapper">
            <div className="logo-upload-box light-mode">
              <div className="upload-icon">📷</div>
              <span>Upload Logo (Light)</span>
            </div>
            <div className="logo-upload-box dark-mode">
              <div className="upload-icon">📷</div>
              <span>Upload Logo (Dark)</span>
            </div>
          </div>

      
          <div className="site-names-wrapper">
            <div className="form-group">
              <label>Website Name (EN)</label>
              <input type="text" className="std-input" placeholder="My Awesome Site" />
            </div>
            <div className="form-group">
              <label className="text-right">اسم الموقع (AR)</label>
              <input type="text" className="std-input text-right" placeholder="موقعي الرائع" />
            </div>
          </div>
        </div>
      </section>

    
      <section className="form-section">
        <div className="form-row">
          <div className="form-group half-width">
            <label>Footer Copyright (EN)</label>
            <input type="text" className="std-input" />
          </div>
          <div className="form-group half-width">
            <label className="text-right">حقوق الملكية (AR)</label>
            <input type="text" className="std-input text-right" />
          </div>
        </div>
      </section>

    
      <section className="form-section">
        <h3 className="section-title">Contact Information</h3>
        <div className="form-row three-cols">
          <div className="form-group">
            <label>Contact Email</label>
            <input type="email" className="std-input" />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" className="std-input" />
          </div>
          <div className="form-group">
            <label>WhatsApp Number</label>
            <input type="tel" className="std-input" />
          </div>
        </div>
      </section>

     
      <section className="form-section">
        <h3 className="section-title">Social Media Links</h3>
        <div className="form-row two-cols">
          <div className="form-group">
            <label>LinkedIn URL</label>
            <input type="text" className="std-input" />
          </div>
          <div className="form-group">
            <label>Behance URL</label>
            <input type="text" className="std-input" />
          </div>
        </div>
        <div className="form-row two-cols" style={{marginTop: '20px'}}>
           <div className="form-group">
            <label>Instagram URL</label>
            <input type="text" className="std-input" />
          </div>
          <div className="form-group">
            <label>Dribble URL</label>
            <input type="text" className="std-input" />
          </div>
        </div>
      </section>

    
      <div className="form-actions">
        <button className="btn-cancel">Cancel</button>
        <button className="btn-save">Save changes</button>
      </div>

    </div>
  );
};

export default GeneralSettings;