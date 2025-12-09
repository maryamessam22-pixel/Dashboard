import React from "react";
import "./Skills.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const SkillsCard = ({ data, onEdit }) => {
  return (
    <div className="skills-card">
      <div className="skills-card-header">
        <h4>{data.titleEN}</h4>
        <button className="edit-btn" onClick={onEdit}>
          <FaEdit />
        </button>
      </div>

      <p>{data.subtitleEN}</p>

      <div dangerouslySetInnerHTML={{ __html: data.descriptionEN }} />
    </div>
  );
};

export default SkillsCard;
