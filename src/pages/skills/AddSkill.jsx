import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../skills/AddEntry.css'; // Shared CSS
import { supabase } from '../../config/Supabase';
import RichTextEditor from '../../components/common/RichTextEditor';

const AddSkill = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [id, setId] = useState(null);

  // Page Section State (Title, Description)
  const [pageContent, setPageContent] = useState({
    title: '',
    description: ''
  });

  // Skill Data State
  const [skillData, setSkillData] = useState({
    icon_url: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Page Content from 'page_sections'
        const { data: pageData } = await supabase
          .from('page_sections')
          .select('*')
          .eq('title', 'Skills')
          .single();

        if (pageData) {
          setPageContent({
            title: pageData.title || '',
            description: pageData.description || ''
          });
        }

        // 2. Fetch Skill Data if ID exists (Edit Mode)
        if (location.state?.id) {
          setId(location.state.id);
          const { data: skill, error: skillError } = await supabase
            .from('Skills')
            .select('*')
            .eq('id', location.state.id)
            .single();

          if (skillError) throw skillError;

          if (skill) {
            setSkillData({
              icon_url: skill.icon_url || ''
            });
          }
        }

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  // HANDLERS
  const handlePageChange = (e) => {
    const { name, value } = e.target;
    setPageContent(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setSkillData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      // Bucket name: portfolio-assets
      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
      setSkillData(prev => ({ ...prev, icon_url: data.publicUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // SEPARATE SAVE FUNCTION: PAGE SETTINGS
  const savePageSettings = async () => {
    setLoading(true);
    try {
      const { error: pageError } = await supabase
        .from('page_sections')
        .update({
          title: pageContent.title,
          description: pageContent.description
        })
        .eq('title', 'Skills');

      if (pageError) throw pageError;
      alert("Page Header updated successfully!");
    } catch (err) {
      console.error("Error updating page:", err);
      alert(`Error updating page: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // SEPARATE SAVE FUNCTION: SKILL ENTRY
  const saveSkill = async () => {
    setLoading(true);
    try {
      const skillPayload = {
        icon_url: skillData.icon_url,
        type: 'icon'
      };

      let skillError;
      if (id) {
        const { error } = await supabase
          .from('Skills')
          .update(skillPayload)
          .eq('id', id);
        skillError = error;
      } else {
        const { error } = await supabase
          .from('Skills')
          .insert([skillPayload]);
        skillError = error;
      }

      if (skillError) throw skillError;

      alert(`Skill saved successfully!`);
      if (!id) {
        setSkillData({ icon_url: '' });
      } else {
        navigate('/skills-exp');
      }
    } catch (err) {
      console.error("Error saving skill:", err);
      alert(`Error saving skill: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm("Delete this skill?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('Skills').delete().eq('id', id);
      if (error) throw error;
      navigate('/skills-exp');
    } catch (err) {
      alert("Error deleting: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="add-entry-container">
      <div className="entry-header">
        <div className="header-title">
          <button onClick={() => navigate(-1)} className="back-btn">❮</button>
          {id ? 'Edit Skill' : 'Add New Skill'}
        </div>
        <div>
          {id && <button className="delete-btn" onClick={handleDelete} disabled={loading} style={{ marginRight: '10px', background: '#ff2b5e', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>Delete</button>}
        </div>
      </div>

      <div className="tabs-container">
        <span className="tab" onClick={() => navigate('/add-experience')}>Experience</span>
        <span className="tab active">Skills</span>
      </div>

      <div className="form-content">

        {/* Section 1: Page Content */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '20px' }}>
          <h3 style={{ color: 'white', margin: 0 }}>Page Header (Page Sections)</h3>
          <button onClick={savePageSettings} disabled={loading} style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>
            Update Page Info
          </button>
        </div>

        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
            <label>Screen Title</label>
            <input
              type="text"
              name="title"
              className="form-input"
              placeholder="Skills"
              value={pageContent.title}
              onChange={handlePageChange}
              style={{ padding: '12px', background: '#1e1a2f', color: 'white', border: '1px solid #3f3f5f', borderRadius: '8px', width: '100%' }}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Description (Page)</label>
          <RichTextEditor
            value={pageContent.description}
            onChange={(html) => setPageContent(prev => ({ ...prev, description: html }))}
          />
        </div>


        {/* Section 2: Skill Entry */}
        <h3 style={{ color: 'white', marginTop: '60px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Skill Entry (Icon)</h3>

        <div className="form-group">
          <label>Drag & Drop Icon / Click to Upload</label>
          <div
            className="upload-box-large"
            style={{
              border: '2px dashed rgba(255,255,255,0.3)',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'rgba(255,255,255,0.05)',
              position: 'relative',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '200px'
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                opacity: 0, cursor: 'pointer',
                zIndex: 10
              }}
            />
            {uploading ? (
              <span style={{ color: '#d1c7e0' }}>Uploading...</span>
            ) : skillData.icon_url ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={skillData.icon_url} alt="Preview" style={{ maxHeight: '120px', marginBottom: '15px' }} />
                <span style={{ color: '#4ade80', background: 'rgba(74, 222, 128, 0.1)', padding: '5px 10px', borderRadius: '4px' }}>Image Selected</span>
              </div>
            ) : (
              <div style={{ color: '#d1c7e0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px', color: '#9d4edd' }}>☁️</div>
                <span style={{ fontSize: '1.1rem' }}>Drag & drop or click to upload icon</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={saveSkill} disabled={loading} style={{ background: '#a855f7', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>
            {id ? "Update Skill" : "Add Skill"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddSkill;