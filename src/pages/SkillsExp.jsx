import React, { useState } from "react";
import SkillsCard from "../components/skills/SkillsCard";
import SkillsForm from "../components/skills/SkillsForm";

import ExpCard from "../components/experience/ExpCard";
import ExpForm from "../components/experience/ExpForm";

import skillsData from "../components/data/skillsData";
import experienceData from "../components/data/experienceData";

import "./SkillsExp.css"; // optional global
import Layout from "../layout/Layout";

const SkillsExp = () => {
  const [skills, setSkills] = useState(skillsData);
  const [experience, setExperience] = useState(experienceData);

  // track editing
  const [editing, setEditing] = useState({
    type: null, // "skill" or "exp"
    index: null,
  });

  const saveSkill = (data) => {
    const updated = [...skills];
    updated[editing.index] = data;
    setSkills(updated);
    setEditing({ type: null, index: null });
  };

  const saveExp = (data) => {
    const updated = [...experience];
    updated[editing.index] = data;
    setExperience(updated);
    setEditing({ type: null, index: null });
  };

  return (

  
    <div className="skills-exp-wrapper">
        <Layout/>
      {/* LEFT SIDE LISTS */}
      <div className="view-columns">
        {/* SKILLS LIST */}
        <div className="skills-column">
          <h3>Skills</h3>
          {skills.map((item, i) => (
            <SkillsCard
              key={i}
              data={item}
              onEdit={() => setEditing({ type: "skill", index: i })}
            />
          ))}
        </div>

        {/* EXPERIENCE LIST */}
        <div className="exp-column">
          <h3>Experience</h3>
          {experience.map((item, i) => (
            <ExpCard
              key={i}
              data={item}
              onEdit={() => setEditing({ type: "exp", index: i })}
            />
          ))}
        </div>
      </div>

      {/* RIGHT SIDE EDITOR AREA */}
      <div className="editor-container">
        {editing.type === "skill" && (
          <SkillsForm
            data={skills[editing.index]}
            onSave={saveSkill}
          />
        )}

        {editing.type === "exp" && (
          <ExpForm
            data={experience[editing.index]}
            onSave={saveExp}
          />
        )}
      </div>
    </div>
  );
};

export default SkillsExp;
