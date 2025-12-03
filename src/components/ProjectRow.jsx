import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import './ProjectRow.css';


const ProjectRow = ({ img, title, date, category, status, views, published }) => {
  return (
    <div className="project-row">
      {/* IMAGE + TITLE + SUBTITLE */}
      <div className="row-info">
        <img src={img} alt={title} className="row-img" />
        <div className="row-text">
          <h4 className="row-title">{title}</h4>
          <span className="row-subtitle">{date}</span>
        </div>
      </div>

      {/* CATEGORY */}
      <div className="row-cell">
        <span className="badge category-badge">
          {category}
        </span>
      </div>

      {/* STATUS */}
      <div className="row-cell">
        <span className={`badge status-badge ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      {/* VIEWS */}
      <div className="row-cell views-text">
        {views}
      </div>

      {/* PUBLISHED DATE */}
      <div className="row-cell date-text">
        {published}
      </div>

      {/* ACTIONS */}
      <div className="row-actions">
        <button className="action-btn edit-btn">
          <Edit2 size={16} />
        </button>
        <button className="action-btn delete-btn">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProjectRow;

