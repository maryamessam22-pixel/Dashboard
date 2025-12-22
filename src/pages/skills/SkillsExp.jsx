import React, { useEffect, useState } from 'react';
import { supabase } from '../../config/Supabase';
import { Link } from 'react-router-dom';
import Layout from '../../layouts/Layout';
import Header from '../../layouts/Header';
import './SkillsExp.css';

const SkillsExp = () => {
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skillsSection, setSkillsSection] = useState({});

  useEffect(() => {
    async function getSkillsAndExperience() {
      
      const skillsRes = await supabase.from('Skills').select('*').eq('type', 'icon');
      setSkills(skillsRes.data || []);

    
      const expRes = await supabase.from('work_experience').select('*');
      setExperience(expRes.data || []);

   
      const sectionRes = await supabase
        .from('page_sections')
        .select('*')
        .eq('id', 4)
        .single();

      if (sectionRes.data) {
        setSkillsSection(sectionRes.data);
      }

      setLoading(false);
    }

    getSkillsAndExperience();
  }, []);

  if (loading) {
    return (
      <div className="loading-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="skills-exp-container">
        <Header title="Pages / Skills & Experience" />

        <div className="content-grid">

        
          <div className="card-container skills-col">
            <div className="ADD-NEW-SKILL">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3 className="card-header">{skillsSection?.title || 'Skills'}</h3>
              
                <Link
                  to="/add-skill"
                  state={{ section: skillsSection }}
                  style={{ fontSize: '0.8rem', color: '#9d4edd', textDecoration: 'none', fontWeight: 'bold' }}
                >
                  Edit ✎
                </Link>
              </div>
              <Link to="/add-skill">
                <button className="add-new-btn">+ Add New Skill</button>
              </Link>
            </div>

            <div className="info-box mb-20">
              <div className="info-text">
                {skillsSection?.subtitle || ''}
              </div>
            </div>

            <div className="info-box large-box mb-20">
              <div className="desc-text" dangerouslySetInnerHTML={{ __html: skillsSection?.description || '' }}></div>
            </div>

            <div className="tools-row">
              {skills.map((skill) => (
                <div key={skill.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                  <div className="tool-icon glass-circle">
                    <img src={skill.icon_url} alt="Skill" />
                  </div>
                 
                  <Link
                    to="/add-skill"
                    state={{ id: skill.id, skillData: skill }}
                    style={{ color: '#9d4edd', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 'bold' }}
                  >
                    Edit ✎
                  </Link>
                </div>
              ))}
            </div>
          </div>


          <div className="card-container experience-col">
            <div className="ADD-NEW-SKILL">
              <h3 className="card-header">Experience</h3>
              <Link to="/add-experience">
                <button className="add-new-btn">+ Add New Experience</button>
              </Link>
            </div>

            <div className="experience-list">
              {experience.map((exp) => (
                <div key={exp.id} className="info-box exp-item">
                  <div className="exp-content">
                    <h4 className="exp-company">{exp.company}</h4>
                    <span className="exp-role">{exp.role}</span>
                    <div className="exp-desc" dangerouslySetInnerHTML={{ __html: exp.description }}></div>
                  </div>
             
                  <Link
                    to="/add-experience"
                    state={{ id: exp.id, expData: exp }}
                    className="edit-btn-small"
                    style={{ marginLeft: 'auto', color: '#9d4edd', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.8rem' }}
                  >
                    Edit ✎
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SkillsExp;
