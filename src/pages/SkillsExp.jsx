import React from 'react';
import './SkillsExp.css'; 
import Layout from '../layout/Layout';
import Header from './../components/Header';

const SkillsExp = () => {
  
 
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


  const softwareIcons = [
    { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Ai', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg' },
    { name: 'Ps', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
    { name: 'Figma', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'JS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Ae', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg' },
    { name: 'Blender', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg' },
  ];

  return (
    <> 
      <Layout/>
      
      <div className="skills-exp-container">
        
    
           <Header title="Pages/ Skills & Experience" />
        <div className="page-header-row">
          <button className="add-new-btn">
            <span className="plus-icon">+</span> Add New
          </button>
        </div>

        <div className="content-grid">
          
          
          <div className="card-container skills-col">
            <h3 className="card-header">Skills</h3>
            <h3 className="card-header">Add new skill</h3>
           
            <div className="info-box mb-20">
              <div className="info-text">
                <strong>Skills</strong> | A Comprehensive Overview Of My UI/UX Designer Skills
              </div>
              <div className="action-icons">
                <i className="icon-edit">✎</i>
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
                <i className="icon-edit">✎</i>
                <i className="icon-delete">🗑</i>
              </div>
            </div>

            
            <div className="tools-row">
              {softwareIcons.map((tool, index) => (
                <div key={index} className="tool-icon glass-circle">
                  <img src={tool.src} alt={tool.name} />
                </div>
              ))}
            </div>
          </div>

         
          <div className="card-container experience-col">
            <h3 className="card-header">Experience</h3>

            <div className="experience-list">
              {experienceData.map((exp) => (
                <div key={exp.id} className="info-box exp-item">
                  <div className="exp-content">
                    <h4 className="exp-company">{exp.company}</h4>
                    <span className="exp-role" style={{ color: exp.color }}>{exp.role}</span>
                    <p className="exp-desc">{exp.desc}</p>
                  </div>
                  <div className="action-icons">
                    <i className="icon-edit">✎</i>
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