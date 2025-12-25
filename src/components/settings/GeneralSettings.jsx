import React, { useEffect, useState } from "react";
import { supabase } from "../../config/Supabase";
import "./GeneralSettings.css";

const GeneralSettings = () => {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [settings, setSettings] = useState({
    title: "",
    website_name_ar: "",
    light_logo: "",
    dark_logo: "",
    contact_email: "",
    contact_phone: "",
    whatsApp_number: "",
    linkedin_url: "",
    behance_url: "",
    instagram_url: "",
    facebook_url: ""
  });

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("page_sections")
      .select("*")
      .eq('page', 'Global')
      .order('id', { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error fetching settings:", error);
    }

    if (data && data.length > 0) {
      const settingsData = data[0];
      const processedData = { ...settingsData };
      if (Array.isArray(settingsData.light_logo) && settingsData.light_logo.length > 0) {
        processedData.light_logo = settingsData.light_logo[0];
      }
      if (Array.isArray(settingsData.dark_logo) && settingsData.dark_logo.length > 0) {
        processedData.dark_logo = settingsData.dark_logo[0];
      }
      setSettings(processedData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `logos/${fileName}`;
      const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);

      if (type === 'light') {
        setSettings(prev => ({ ...prev, light_logo: data.publicUrl }));
      } else {
        setSettings(prev => ({ ...prev, dark_logo: data.publicUrl }));
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Error uploading logo: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setUploading(true);
      const { id, created_at, ...updates } = settings;

      if (updates.light_logo && typeof updates.light_logo === 'string') {
        updates.light_logo = [updates.light_logo];
      }
      if (updates.dark_logo && typeof updates.dark_logo === 'string') {
        updates.dark_logo = [updates.dark_logo];
      }

      let error;
      if (settings.id) {
        const res = await supabase
          .from('page_sections')
          .update(updates)
          .eq('id', settings.id);
        error = res.error;
      } else {
        const newRecord = { ...updates, page: 'Global', section: 'settings' };
        const res = await supabase
          .from('page_sections')
          .insert([newRecord]);
        error = res.error;
      }

      if (error) throw error;
      alert("Settings saved successfully!");
    } catch (err) {
      console.error("Error saving settings:", err);
      alert("Error saving settings.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!settings.id) return;
    if (!window.confirm("Are you sure you want to delete these settings? This might break the site display.")) return;

    try {
      setUploading(true);
      const { error } = await supabase
        .from('page_sections')
        .delete()
        .eq('id', settings.id);

      if (error) throw error;

      setSettings({});
      alert("Settings deleted successfully.");
    } catch (err) {
      console.error("Error deleting settings:", err);
      alert("Error deleting settings.");
    } finally {
      setUploading(false);
    }
  };

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
        <div className="settings-header">
          <h3 className="section-title title-no-margin">Site Identity</h3>
        </div>

        <div className="form-row">

          <div className="form-group" >
            <label>Light Logo</label>
            <div className="logo-upload-box light-mode relative-box">
              <input
                type="file"
                accept="image/*"
                className="hidden-file-input hidden-upload-input"
                onChange={(e) => handleLogoUpload(e, 'light')}
              />
              {uploading ? (
                <span>Uploading...</span>
              ) : settings.light_logo ? (
                <img src={settings.light_logo} alt="Light Logo" className="logo-preview" />
              ) : (
                <span>Upload Light Logo</span>
              )}
            </div>
          </div>


          <div className="form-group" >
            <label>Dark Logo</label>
            <div className="logo-upload-box dark-mode relative-box">
              <input
                type="file"
                accept="image/*"
                className="hidden-file-input hidden-upload-input"
                onChange={(e) => handleLogoUpload(e, 'dark')}
              />
              {uploading ? (
                <span>Uploading...</span>
              ) : settings.dark_logo ? (
                <img src={settings.dark_logo} alt="Dark Logo" className="logo-preview" />
              ) : (
                <span>Upload Dark Logo</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Website Name (EN)</label>
            <input
              type="text"
              className="std-input"
              value={settings.title || ""}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>اسم الموقع (AR)</label>
            <input
              type="text"
              className="std-input text-right"
              value={settings.website_name_ar || ""}
              onChange={(e) => handleChange('website_name_ar', e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="form-section">
        <h3 className="section-title">Contact Information</h3>
        <div className="form-row three-cols">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="std-input"
              value={settings.contact_email || ""}
              onChange={(e) => handleChange('contact_email', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              className="std-input"
              value={settings.contact_phone || ""}
              onChange={(e) => handleChange('contact_phone', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>WhatsApp</label>
            <input
              type="text"
              className="std-input"
              value={settings.whatsApp_number || ""}
              onChange={(e) => handleChange('whatsApp_number', e.target.value)}
            />
          </div>
        </div>
      </section>


      <section className="form-section">
        <h3 className="section-title">Social Media Links</h3>
        <div className="form-row two-cols">
          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="text"
              className="std-input"
              value={settings.linkedin_url || ""}
              onChange={(e) => handleChange('linkedin_url', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Behance</label>
            <input
              type="text"
              className="std-input"
              value={settings.behance_url || ""}
              onChange={(e) => handleChange('behance_url', e.target.value)}
            />
          </div>
        </div>
        <div className="form-row two-cols">
          <div className="form-group">
            <label>Instagram</label>
            <input
              type="text"
              className="std-input"
              value={settings.instagram_url || ""}
              onChange={(e) => handleChange('instagram_url', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Facebook</label>
            <input
              type="text"
              className="std-input"
              value={settings.facebook_url || ""}
              onChange={(e) => handleChange('facebook_url', e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="form-actions">
        <button className="btn-cancel" onClick={fetchSettings}>Cancel</button>
        <button className="btn-delete" onClick={handleDelete}>Delete</button>
        <button className="btn-save" onClick={handleSave} disabled={uploading}>
          {uploading ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </div>
  );
};

export default GeneralSettings;