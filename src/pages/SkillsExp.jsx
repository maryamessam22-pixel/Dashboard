import React, { useState, useRef } from "react";
import SkillsCard from "../components/skills/SkillsCard";
import SkillsForm from "../components/skills/SkillsForm";
import ExpCard from "../components/experience/ExpCard";
import ExpForm from "../components/experience/ExpForm";

import skillsData from "../data/skillsData";
import experienceData from "../data/experienceData";

const SkillsExp = () => {
  const [activeForm, setActiveForm] = useState("experience");
  const formRef = useRef(null);

  const scrollToForm = () => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const handleEditSkill = (id) => {
    setActiveForm("skills");
    scrollToForm();
  };

  const handleEditExperience = (id) => {
    setActiveForm("experience");
    scrollToForm();
  };

  return (
    <div className="skills-exp-container">

      {/* ------------------ TOP CARDS SECTION ------------------ */}
      <div className="cards-row">

        {/* SKILLS */}
        <div className="skills-section">
          <h2>Skills</h2>
          {skillsData.map((item) => (
            <SkillsCard key={item.id} data={item} onEdit={() => handleEditSkill(item.id)} />
          ))}
        </div>

        {/* EXPERIENCE */}
        <div className="experience-section">
          <h2>Experience</h2>
          {experienceData.map((item) => (
            <ExpCard key={item.id} data={item} onEdit={() => handleEditExperience(item.id)} />
          ))}
        </div>

      </div>

      {/* ------------------ EDIT / ADD SECTION ------------------ */}
      <div ref={formRef} className="add-section">

        {/* Tabs */}
        <div className="tabs">
          <button
            className={activeForm === "experience" ? "active" : ""}
            onClick={() => setActiveForm("experience")}
          >
            Experience
          </button>
          <button
            className={activeForm === "skills" ? "active" : ""}
            onClick={() => setActiveForm("skills")}
          >
            Skills
          </button>
        </div>

        {/* Form Content */}
        {activeForm === "experience" && <ExpForm />}
        {activeForm === "skills" && <SkillsForm />}

      </div>
    </div>
  );
};

export default SkillsExp;
