import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../skills/AddEntry.css'; // Shared CSS
import { supabase } from '../../config/Supabase';
import RichTextEditor from '../../components/common/RichTextEditor';

const AddExperience = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);

  // Initial state matching Supabase columns: company, role, description
  const [experienceData, setExperienceData] = useState({
    company: '',
    role: '',
    description: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Experience Data if ID exists (Edit Mode)
        if (location.state?.id) {
          setId(location.state.id);
          const { data: exp, error: expError } = await supabase
            .from('work_experience')
            .select('*')
            .eq('id', location.state.id)
            .single();

          if (expError) throw expError;

          if (exp) {
            setExperienceData({
              company: exp.company || '',
              role: exp.role || '',
              description: exp.description || ''
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

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setExperienceData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Save the Work Experience entry matching table columns
      const experiencePayload = {
        company: experienceData.company,
        role: experienceData.role,
        description: experienceData.description
      };

      let expError;
      if (id) {
        const { error } = await supabase
          .from('work_experience')
          .update(experiencePayload)
          .eq('id', id);
        expError = error;
      } else {
        const { error } = await supabase
          .from('work_experience')
          .insert([experiencePayload]);
        expError = error;
      }

      if (expError) throw expError;

      alert(`Experience entry ${id ? 'updated' : 'added'} successfully!`);
      if (!id) {
        setExperienceData({
          company: '',
          role: '',
          description: ''
        });
      } else {
        navigate('/skills-exp');
      }

    } catch (err) {
      console.error("Error saving experience:", err);
      alert(`Error saving experience: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm("Delete this experience entry?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('work_experience').delete().eq('id', id);
      if (error) throw error;
      alert("Entry deleted.");
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
          {id ? 'Edit Experience Entry' : 'Add New Experience Entry'}
        </div>
        <div>
          <button className="save-btn" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "💾 Save Entry"}
          </button>
        </div>
      </div>

      <div className="tabs-container">
        <span className="tab active">Experience</span>
        <span className="tab" onClick={() => navigate('/add-skill')}>Skills</span>
      </div>

      <div className="form-content">
        <h3 style={{ color: 'white', marginTop: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Experience Details</h3>

        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
            <label>Company Name</label>
            <input type="text" name="company" className="form-input" placeholder="e.g. Google" value={experienceData.company} onChange={handleExperienceChange} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Role / Job Title</label>
            <input type="text" name="role" className="form-input" placeholder="e.g. Senior Product Designer" value={experienceData.role} onChange={handleExperienceChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <RichTextEditor
            value={experienceData.description}
            onChange={(html) => setExperienceData(prev => ({ ...prev, description: html }))}
          />
        </div>

        {id && (
          <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleDelete}
              disabled={loading}
              style={{
                background: '#ff2b5e',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🗑 Delete Experience
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AddExperience;