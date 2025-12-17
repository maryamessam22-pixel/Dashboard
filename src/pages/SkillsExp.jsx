import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SkillsExp.css';
import Layout from '../layout/Layout';
import Header from './../components/Header';

/* ===== ICON IMPORTS ===== */
import icon_1 from '../assets/icon_1.png';
import icon_2 from '../assets/icon_2.png';
import icon_3 from '../assets/icon_3.png';
import icon_4 from '../assets/icon_4.png';
import icon_5 from '../assets/icon_5.png';
import icon_6 from '../assets/icon_6.png';
import icon_7 from '../assets/icon_7.png';

const SkillsExp = () => {
  const navigate = useNavigate();

  /* ===== EXPERIENCE DATA ===== */
  const experienceData = [
    {
      id: 1,
      company: "Vivid Studios",
      role: "Motion & Media Designer",
      desc: "Produced engaging digital visuals, animations, and social media reels.",
      color: "#a855f7"
    },
    {
      id: 2,
      company: "Hany Saad Innovation",
      role: "Graphic Designer",
      desc: "Graphic Designer at Hany Saad Innovations created visual campaigns and brand materials that aligned with high-end architectural concepts.",
      color: "#a855f7"
    },
    {
      id: 3,
      company: "KGoing Company",
      role: "Graphic Designer",
      desc: "Graphic Designer at Keep Going Company; created visual campaigns, logos, and brand materials that aligned with the energetic branding of the supplements and fitness equipment industry.",
      color: "#a855f7"
    },
    {
      id: 4,
      company: "Freelance Designer",
      role: "Self-Employed",
      desc: "UI/UX Designer designing interactive mobile apps and websites, focusing on usability, accessibility, and visual harmony.",
      color: "#a855f7"
    }
  ];

  /* ===== SOFTWARE ICONS ===== */
  const softwareIcons = [
    { name: 'React', icon: icon_1 },
    { name: 'Illustrator', icon: icon_2 },
    { name: 'Photoshop', icon: icon_3 },
    { name: 'Figma', icon: icon_4 },
    { name: 'JavaScript', icon: icon_5 },
    { name: 'After Effects', icon: icon_6 },
    { name: 'Blender', icon: icon_7 },
  ];

  return (
    <>
      <Layout />

      <div className="skills-exp-container">
        <Header title="Pages / Skills & Experience" />

        <div className="content-grid">

          {/* ================= SKILLS ================= */}
          <div className="card-container skills-col">

            <div className="ADD-NEW-SKILL">
              <h3 className="card-header">Skills</h3>
              <button
                className="add-new-btn"
                onClick={() => navigate('/add-skill')}
              >
                <span className="plus-icon">+</span> Add New Skill
              </button>
            </div>

            <div className="info-box mb-20">
              <div className="info-text">
                <strong>Skills</strong> | A Comprehensive Overview Of My UI/UX Designer Skills
              </div>
              <div className="action-icons">
                <i className="icon-edit" onClick={() => navigate('/add-skill')}>✎</i>
                <i className="icon-delete">🗑</i>
              </div>
            </div>

            <div className="info-box large-box mb-20">
              <p className="desc-text">
                My Core Expertise Lies In UI/UX Design, Encompassing Both User Experience And User Interface Methodologies.
                This Deep Understanding Forms The Backbone Of My Design Process, Ensuring Usability, Creativity, And Impact In Every Project.
                <br /><br />
                Using Digital Tools And Techniques, I Create Multifunctional Products, Tailored To The Needs Of The Target Audience.
              </p>
              <div className="action-icons top-right">
                <i className="icon-edit" onClick={() => navigate('/add-skill')}>✎</i>
                <i className="icon-delete">🗑</i>
              </div>
            </div>

            <div className="tools-row">
              {softwareIcons.map((tool, index) => (
                <div key={index} className="tool-icon glass-circle">
                  <img src={tool.icon} alt={tool.name} />
                </div>
              ))}
            </div>

          </div>

          {/* ================= EXPERIENCE ================= */}
          <div className="card-container experience-col">

            <div className="ADD-NEW-SKILL">
              <h3 className="card-header">Experience</h3>
              <button
                className="add-new-btn"
                onClick={() => navigate('/add-experience')}
              >
                <span className="plus-icon">+</span> Add New Experience
              </button>
            </div>

            <div className="experience-list">
              {experienceData.map((exp) => (
                <div key={exp.id} className="info-box exp-item">
                  <div className="exp-content">
                    <h4 className="exp-company">{exp.company}</h4>
                    <span className="exp-role" style={{ color: exp.color }}>
                      {exp.role}
                    </span>
                    <p className="exp-desc">{exp.desc}</p>
                  </div>
                  <div className="action-icons">
                    <i className="icon-edit" onClick={() => navigate('/add-experience')}>✎</i>
                    <i className="icon-delete">🗑</i>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default SkillsExp;
