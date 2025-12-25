import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutPageSettings.css';
import RichTextEditor from '../common/RichTextEditor';
import { supabase } from '../../config/Supabase';

const AboutPageSettings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('about_sections')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;

      if (data) {
        setSections(data);
      }
    } catch (err) {
      console.error("Error fetching about settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const updatePromises = sections.map(async (section) => {
        const { id, ...payload } = section;
        const { error } = await supabase
          .from('about_sections')
          .update(payload)
          .eq('id', id);

        if (error) throw error;
      });

      await Promise.all(updatePromises);

      alert('About settings saved successfully!');
      fetchAboutData();
    } catch (err) {
      console.error("Error saving settings:", err);
      alert('Error saving settings: ' + err.message);
    }
  };

  // Helper to update state
  const updateSection = (id, field, value) => {
    setSections(prev => prev.map(sec =>
      sec.id === id ? { ...sec, [field]: value } : sec
    ));
  };

  // Image Upload Logic (ID 1)
  const handleLogoUpload = async (e, sectionId) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const fileName = `personal-${Date.now()}-${file.name.replace(/\s/g, '')}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(fileName);

      if (data) {
        const newImages = [data.publicUrl];
        updateSection(sectionId, 'images', newImages);

        const { error: saveError } = await supabase
          .from('about_sections')
          .update({ images: newImages })
          .eq('id', sectionId);

        if (saveError) throw saveError;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image: " + error.message);
    }
  };

  const handleDeleteLogo = async (e, sectionId) => {
    e.preventDefault();
    if (window.confirm("Remove this image?")) {
      updateSection(sectionId, 'images', []);

      try {
        const { error: saveError } = await supabase
          .from('about_sections')
          .update({ images: [] })
          .eq('id', sectionId);

        if (saveError) throw saveError;
      } catch (err) {
        console.error("Error removing image:", err);
        alert("Error removing image: " + err.message);
      }
    }
  };

  if (loading && sections.length === 0) {
    return <div className="loading-center"><p>Loading Settings...</p></div>;
  }

  return (
    <div className="settings-form-container">
      {sections.map((section) => (
        <React.Fragment key={section.id}>

          {section.id === 1 && (
            <section className="form-section">
              <h3 className="section-title">Personal Info</h3>
              <div className="hero-grid">

                <div className="hero-image-upload">
                  {section.images && section.images[0] ? (
                    <>
                      <img
                        src={section.images[0]}
                        alt="Personal Image"
                      />
                      <button
                        onClick={(e) => handleDeleteLogo(e, section.id)}
                        className="remove-image-btn"
                        title="Remove Image"
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <div className="upload-placeholder">
                      <span className="camera-icon">📷</span>
                      <span>Upload Personal Image</span>
                    </div>
                  )}
                  {(!section.images || !section.images[0]) && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleLogoUpload(e, section.id)}
                      className="file-input-overlay"
                    />
                  )}
                </div>

                <div className="hero-inputs">
                  <div className="form-group">
                    <label>Section Title (EN)</label>
                    <input
                      type="text"
                      className="std-input"
                      value={section.title || ''}
                      onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-right">عنوان القسم (AR)</label>
                    <input
                      type="text"
                      className="std-input text-right"
                      value={section.subtitle || ''}
                      onChange={(e) => updateSection(section.id, 'subtitle', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Heading (EN)</label>
                    <input
                      type="text"
                      className="std-input"
                      value={section.meta_title || ''}
                      onChange={(e) => updateSection(section.id, 'meta_title', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-right">اسم الموقع (AR)</label>
                    <input
                      type="text"
                      className="std-input text-right"
                      value={section.meta_description || ''}
                      onChange={(e) => updateSection(section.id, 'meta_description', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section clean-section">
                <div className="form-group">
                  <label>Bio (EN)</label>
                  <RichTextEditor
                    placeholder=" bio here..."
                    value={section.description || ''}
                    onChange={(val) => updateSection(section.id, 'description', val)}
                  />
                </div>
                <div className="form-group arabic-bio-group">
                  <label className="text-right">من أنا (AR)</label>
                  <div dir="rtl">
                    <RichTextEditor
                      placeholder=" نبذة عني..."
                      value={section.description_ar || ''}
                      onChange={(val) => updateSection(section.id, 'description_ar', val)}
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {section.id === 2 && (
            <section className="form-section">
              <h3 className="section-title">Education Section</h3>
              <div className="form-row">
                <div className="form-group half-width">
                  <label>Section Title (EN)</label>
                  <input
                    type="text"
                    className="std-input"
                    value={section.title || ''}
                    onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                  />
                </div>
                <div className="form-group half-width">
                  <label className="text-right">عنوان القسم (AR)</label>
                  <input
                    type="text"
                    className="std-input text-right"
                    value={section.subtitle || ''}
                    onChange={(e) => updateSection(section.id, 'subtitle', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group education-bio-group">
                <label>Bio (EN)</label>
                <RichTextEditor
                  placeholder="Education details..."
                  value={section.description || ''}
                  onChange={(val) => updateSection(section.id, 'description', val)}
                />
              </div>
              <div className="form-group arabic-bio-group">
                <label className="text-right">من أنا (AR)</label>
                <div dir="rtl">
                  <RichTextEditor
                    placeholder="تفاصيل التعليم..."
                    value={section.description_ar || ''}
                    onChange={(val) => updateSection(section.id, 'description_ar', val)}
                  />
                </div>
              </div>
            </section>
          )}


          {section.id === 3 && (
            <section className="config-box">
              <div className="config-header">
                <h4>Experience Section Configuration</h4>
                <div className="toggle-wrapper">
                  <span>Show Experience on About page</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={section.visible}
                      onChange={() => updateSection(section.id, 'visible', !section.visible)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              <div className="config-content experience-fields">
                <div className="form-row">
                  <div className="form-group half-width">
                    <label>Section Title (EN)</label>
                    <input
                      type="text"
                      className="std-input"
                      value={section.title || ''}
                      onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                    />
                  </div>
                  <div className="form-group half-width">
                    <label className="text-right">عنوان القسم (AR)</label>
                    <input
                      type="text"
                      className="std-input text-right"
                      value={section.subtitle || ''}
                      onChange={(e) => updateSection(section.id, 'subtitle', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Bio (EN)</label>
                  <RichTextEditor
                    placeholder="Experience Bio..."
                    value={section.description || ''}
                    onChange={(val) => updateSection(section.id, 'description', val)}
                  />
                </div>
              </div>

              <div className="config-content">
                <p>To add or edit specific Experience go to skills & experience page.</p>
                <button
                  className="manage-btn"
                  onClick={() => navigate('/skills-exp')}
                >
                  Manage Experience List ↗
                </button>
              </div>
            </section>
          )}

        </React.Fragment>
      ))}

      <div className="form-actions">
        <button className="btn-cancel" onClick={() => fetchAboutData()}>Cancel</button>
        <button className="btn-save" onClick={handleSave}>Save changes</button>
      </div>

    </div>
  );
};

export default AboutPageSettings;