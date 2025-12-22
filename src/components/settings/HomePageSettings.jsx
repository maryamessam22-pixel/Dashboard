import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePageSettings.css';
import RichTextEditor from '../common/RichTextEditor';
import { supabase } from '../../config/Supabase';

const HomePageSettings = () => {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Section States
  const [hero, setHero] = useState({ title: '', subtitle: '', images: [] });
  const [about, setAbout] = useState({ title: '', description: '', images: [] });
  const [categories, setCategories] = useState({ title: '', description: '', visible: true });
  const [skills, setSkills] = useState({ title: '', subtitle: '', description: '', visible: true });

  // Store raw IDs if needed for updates
  const [ids, setIds] = useState({});

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page', 'home');

      if (error) throw error;

      // Map to state
      const heroSec = data.find(s => s.section === 'hero');
      const aboutSec = data.find(s => s.section === 'about_sec');
      const catSec = data.find(s => s.section === 'category_sec');
      const skillSec = data.find(s => s.section === 'skills_sec');

      if (heroSec) {
        setHero({
          title: heroSec.title || '',
          subtitle: heroSec.subtitle || '',
          images: heroSec.images || []
        });
        setIds(prev => ({ ...prev, hero: heroSec.id }));
      }
      if (aboutSec) {
        setAbout({
          title: aboutSec.title || '',
          description: aboutSec.description || '',
          images: aboutSec.images || []
        });
        setIds(prev => ({ ...prev, about: aboutSec.id }));
      }
      if (catSec) {
        setCategories({
          title: catSec.title || '',
          description: catSec.description || '',
          visible: catSec.visible !== false
        });
        setIds(prev => ({ ...prev, categories: catSec.id }));
      }
      if (skillSec) {
        setSkills({
          title: skillSec.title || '',
          subtitle: skillSec.subtitle || '',
          description: skillSec.description || '',
          visible: skillSec.visible !== false
        });
        setIds(prev => ({ ...prev, skills: skillSec.id }));
      }

    } catch (err) {
      console.error("Error fetching home settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updates = [
        {
          section: 'hero',
          page: 'home',
          title: hero.title,
          subtitle: hero.subtitle,
          images: hero.images,
          id: ids.hero
        },
        {
          section: 'about_sec',
          page: 'home',
          title: about.title,
          description: about.description,
          images: about.images,
          id: ids.about
        },
        {
          section: 'category_sec',
          page: 'home',
          title: categories.title,
          description: categories.description,
          visible: categories.visible,
          id: ids.categories
        },
        {
          section: 'skills_sec',
          page: 'home',
          title: skills.title,
          subtitle: skills.subtitle,
          description: skills.description,
          visible: skills.visible,
          id: ids.skills
        }
      ];

      for (const update of updates) {
        const payload = { ...update };
        const id = payload.id;
        delete payload.id;

        if (id) {
          await supabase.from('page_sections').update(payload).eq('id', id);
        } else {
          await supabase.from('page_sections').insert([payload]);
        }
      }

      alert('Home settings saved successfully!');
      fetchHomeData(); // Refresh IDs
    } catch (err) {
      console.error("Error saving settings:", err);
      alert('Error saving settings: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e, section) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${section}_${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);

      if (section === 'hero') {
        setHero(prev => ({ ...prev, images: [data.publicUrl] }));
      } else if (section === 'about') {
        setAbout(prev => ({ ...prev, images: [data.publicUrl] }));
      }
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };


  if (loading && Object.keys(ids).length === 0) {
    return <div className="settings-form-container" style={{ color: 'white', textAlign: 'center', paddingTop: '50px' }}>Loading Settings...</div>;
  }

  return (
    <div className="settings-form-container">

      {/* 1. Hero Section */}
      <section className="form-section">
        <h3 className="section-title">Hero Section</h3>
        <div className="hero-grid" style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>

          <div className="hero-image-upload" style={{
            width: '200px',
            height: '200px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: '1px dashed rgba(255,255,255,0.2)'
          }}>
            {hero.images && hero.images[0] ? (
              <img src={hero.images[0]} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div className="upload-placeholder" style={{ textAlign: 'center', color: '#aaa' }}>
                <div style={{ fontSize: '24px', marginBottom: '5px' }}>📷</div>
                <div style={{ fontSize: '12px' }}>Upload Hero Image</div>
              </div>
            )}
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'hero')} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
          </div>

          <div className="hero-inputs" style={{ flex: 1 }}>
            <div className="form-group">
              <label>Hero Title (Main Greeting)</label>
              <input
                type="text"
                className="std-input"
                placeholder="Hello, I'm..."
                value={hero.title}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Hero Subtitle</label>
              <input
                type="text"
                className="std-input"
                placeholder="UI/UX Designer..."
                value={hero.subtitle}
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Section */}
      <section className="form-section">
        <h3 className="section-title">About Section</h3>
        <div className="about-grid">
          <div className="about-inputs">
            <div className="form-group">
              <label>About Title</label>
              <input
                type="text"
                className="std-input"
                value={about.title}
                onChange={(e) => setAbout({ ...about, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <RichTextEditor
                value={about.description}
                onChange={(val) => setAbout({ ...about, description: val })}
                placeholder="Write about yourself..."
              />
            </div>
          </div>

          <div className="hero-image-upload about-img-height">
            {about.images && about.images[0] ? (
              <img src={about.images[0]} alt="About" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
            ) : (
              <div className="upload-placeholder">
                <span className="camera-icon">📷</span>
                <span>Upload About Image</span>
              </div>
            )}
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'about')} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
          </div>
        </div>
      </section>

      {/* 3. Category Config */}
      <section className="config-box">
        <div className="config-header">
          <h4>Category Section Configuration</h4>
          <div className="toggle-wrapper">
            <span>Show Categories on Home page</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={categories.visible}
                onChange={() => setCategories({ ...categories, visible: !categories.visible })}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <div className="hero-inputs" style={{ marginBottom: '20px' }}>
          <div className="form-group">
            <label>Section Title</label>
            <input
              type="text"
              className="std-input"
              value={categories.title}
              onChange={(e) => setCategories({ ...categories, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <RichTextEditor
              value={categories.description}
              onChange={(val) => setCategories({ ...categories, description: val })}
            />
          </div>
        </div>

        <div className="config-content">
          <p>To add or edit specific Category go to categories page.</p>
          <Link className="manage-btn" to="/categories">
            Manage Categories List ↗
          </Link>
        </div>
      </section>

      {/* 4. Skills Config */}
      <section className="config-box">
        <div className="config-header">
          <h4>Skills Section Configuration</h4>
          <div className="toggle-wrapper">
            <span>Show Skills on Home page</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={skills.visible}
                onChange={() => setSkills({ ...skills, visible: !skills.visible })}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <div className="hero-inputs" style={{ marginBottom: '20px' }}>
          <div className="form-group">
            <label>Section Title</label>
            <input
              type="text"
              className="std-input"
              value={skills.title}
              onChange={(e) => setSkills({ ...skills, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Subtitle</label>
            <input
              type="text"
              className="std-input"
              value={skills.subtitle}
              onChange={(e) => setSkills({ ...skills, subtitle: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <RichTextEditor
              value={skills.description}
              onChange={(val) => setSkills({ ...skills, description: val })}
            />
          </div>
        </div>

        <div className="config-content">
          <p>To add or edit specific Skill go to skills page.</p>
          <Link className="manage-btn" to="/skills-exp">
            Manage Skills List ↗
          </Link>
        </div>
      </section>

      <div className="form-actions">
        <button className="btn-save" onClick={handleSave} disabled={loading || uploading}>
          {loading ? 'Saving...' : 'Save changes'}
        </button>
      </div>
    </div>
  );
};

export default HomePageSettings;
