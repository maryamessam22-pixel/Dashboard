// ExperienceCard.jsx
import React from 'react';
import './SkillsExp.css';

const ExperienceCard = ({ date, title, place }) => {
  return (
    <div className="experience-card">
      <span className="exp-date">{date}</span>
      <h3 className="exp-title">{title}</h3>
      <p className="exp-place">{place}</p>
    </div>
  );
};

export default ExperienceCard;
