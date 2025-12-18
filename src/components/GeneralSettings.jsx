import React, { useEffect, useState } from "react";
import { supabase } from "../Supabase";
import "./GeneralSettings.css";

const GeneralSettings = () => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState("");

  useEffect(() => {
    async function getSettings() {
      const res = await supabase.from("page_sections").select("*")     .order('id', { ascending: true }) 
        .limit(1)
        .single(); 
      setSettings(res.data);
      setLoading(false);
    }
    getSettings();
  }, []);

  if (loading) {
  return (
    <div className="loading-center">
      <p>Loading...</p>
    </div>
  );
}


  return (
    <div className="settings-form-container">
      
      <section className="form-section">
        <h3 className="section-title">Site Identity</h3>
        <div className="form-row">
          
          <div className="form-group" >
            <label>Light Logo</label>
            <div className="logo-upload-box light-mode">
              {settings.light_logo ? (
                <img src={settings.light_logo} alt="Light Logo"  />
              ) : (
                <span>Upload Light Logo</span>
              )}
            </div>
          </div>

          
          <div className="form-group" >
            <label>Dark Logo</label>
            <div className="logo-upload-box dark-mode">
              {settings.dark_logo ? (
                <img src={settings.dark_logo} alt="Dark Logo"  />
              ) : (
                <span>Upload Dark Logo</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Website Name (EN)</label>
            <input type="text" className="std-input" value={settings.website_name_en}/>
          </div>
          <div className="form-group">
            <label>اسم الموقع (AR)</label>
            <input type="text" className="std-input text-right" value={settings.website_name_ar}/>
          </div>
        </div>
      </section>


      <section className="form-section">
        <div className="form-row">
          <div className="form-group half-width">
            <label>Footer Text (EN)</label>
            <input type="text" className="std-input" value={settings.footer_text_EN} />
          </div>
          <div className="form-group half-width">
            <label className="text-right">نص الفوتر (AR)</label>
            <input type="text" className="std-input text-right" value={settings.footer_text_ar}/>
          </div>
        </div>
      </section>

    
      <section className="form-section">
        <h3 className="section-title">Contact Information</h3>
        <div className="form-row three-cols">
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="std-input" value={settings.contact_email}/>
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" className="std-input" value={settings.contact_phone }/>
          </div>
          <div className="form-group">
            <label>WhatsApp</label>
            <input type="text" className="std-input" value={settings.whatsApp_number} />
          </div>
        </div>
      </section>

   
      <section className="form-section">
        <h3 className="section-title">Social Media Links</h3>
        <div className="form-row two-cols">
          <div className="form-group">
            <label>LinkedIn</label>
            <input type="text" className="std-input" value={settings.linkedin_url}/>
          </div>
          <div className="form-group">
            <label>Behance</label>
            <input type="text" className="std-input" value={settings.behance_url}/>
          </div>
        </div>
        <div className="form-row two-cols">
          <div className="form-group">
            <label>Instagram</label>
            <input type="text" className="std-input" value={settings.instagram_url}/>
          </div>
          <div className="form-group">
            <label>Facebook</label>
            <input type="text" className="std-input" value={settings.facebook_url}/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GeneralSettings;


