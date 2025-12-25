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

  useEffect(() => {
    async function getSettings() {
      const res = await supabase.from("page_sections").select("*")
        .order('id', { ascending: true })
        .limit(1)
        .single();

      if (res.data) {
        setSettings(res.data);
      }
      setLoading(false);
    }
    getSettings();
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
      const { id, created_at, ...updates } = settings; // Exclude id and created_at from updates if necessary, or just update fields

      // If we are updating an existing row
      let error;
      if (settings.id) {
        const res = await supabase
          .from('page_sections')
          .update(updates)
          .eq('id', settings.id);
        error = res.error;
      } else {
        // If no settings exist yet (though limit(1) implies one might), insert new
        // Ideally we should check if one exists or use upsert if ID is known/fixed
        // But since we fetched single(), if it was empty, settings.id would be undefined.
        // Let's assume update if ID exists, otherwise insert.
        const res = await supabase
          .from('page_sections')
          .insert([settings]);
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

      setSettings({}); // Clear local state
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 className="section-title" style={{ marginBottom: 0 }}>Site Identity</h3>
          <div className="form-actions" style={{ marginTop: 0, border: 'none', padding: 0 }}>
            <button className="btn-cancel" onClick={handleDelete} style={{ background: '#ef4444', color: 'white' }}>Delete</button>
            <button className="btn-save" onClick={handleSave} disabled={uploading}>
              {uploading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="form-row">

          <div className="form-group" >
            <label>Light Logo</label>
            <div className="logo-upload-box light-mode" style={{ position: 'relative' }}>
              <input
                type="file"
                accept="image/*"
                className="hidden-file-input"
                style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 10 }}
                onChange={(e) => handleLogoUpload(e, 'light')}
              />
              {uploading ? (
                <span>Uploading...</span>
              ) : settings.light_logo ? (
                <img src={settings.light_logo} alt="Light Logo" style={{ maxWidth: '80%', maxHeight: '80%' }} />
              ) : (
                <span>Upload Light Logo</span>
              )}
            </div>
          </div>


          <div className="form-group" >
            <label>Dark Logo</label>
            <div className="logo-upload-box dark-mode" style={{ position: 'relative' }}>
              <input
                type="file"
                accept="image/*"
                className="hidden-file-input"
                style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 10 }}
                onChange={(e) => handleLogoUpload(e, 'dark')}
              />
              {uploading ? (
                <span>Uploading...</span>
              ) : settings.dark_logo ? (
                <img src={settings.dark_logo} alt="Dark Logo" style={{ maxWidth: '80%', maxHeight: '80%' }} />
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
        <button className="btn-cancel" onClick={handleDelete} style={{ background: '#ef4444', color: 'white' }}>Delete</button>
        <button className="btn-save" onClick={handleSave} disabled={uploading}>
          {uploading ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </div>
  );
};

export default GeneralSettings;