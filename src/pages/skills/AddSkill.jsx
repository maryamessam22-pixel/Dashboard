import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../skills/AddEntry.css';
import './AddSkill.css';
import { supabase } from '../../config/Supabase';
import RichTextEditor from '../../components/common/RichTextEditor';

const AddSkill = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [id, setId] = useState(null);

  const [pageContent, setPageContent] = useState({
    title: '',
    description: ''
  });

  const [skillData, setSkillData] = useState({
    icon_url: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
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

      // I Add policy at supabase at Bucket name: portfolio-assets
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
          {id && <button className="delete-btn-custom" onClick={handleDelete} disabled={loading}>Delete</button>}
        </div>
      </div>

      <div className="tabs-container">
        <span className="tab" onClick={() => navigate('/add-experience')}>Experience</span>
        <span className="tab active">Skills</span>
      </div>

      <div className="form-content">


        <div className="page-header-container">
          <h3 className="page-header-title">Page Header (Page Sections)</h3>
          <button onClick={savePageSettings} disabled={loading} className="update-info-btn">
            Update Page Info
          </button>
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <label>Screen Title</label>
            <input
              type="text"
              name="title"
              className="form-input skill-input-custom"
              placeholder="Skills"
              value={pageContent.title}
              onChange={handlePageChange}
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



        <h3 className="skill-entry-header">Skill Entry (Icon)</h3>

        <div className="form-group">
          <label>Drag & Drop Icon / Click to Upload</label>
          <div
            className="upload-box-large"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input-overlay"
            />
            {uploading ? (
              <span className="uploading-text">Uploading...</span>
            ) : skillData.icon_url ? (
              <div className="preview-container">
                <img src={skillData.icon_url} alt="Preview" className="preview-image" />
                <span className="preview-badge">Image Selected</span>
              </div>
            ) : (
              <div className="placeholder-content">
                <div className="cloud-icon">☁️</div>
                <span className="placeholder-text">Drag & drop or click to upload icon</span>
              </div>
            )}
          </div>
        </div>

        <div className="footer-actions">
          <button onClick={saveSkill} disabled={loading} className="save-skill-btn">
            {id ? "Update Skill" : "Add Skill"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddSkill;