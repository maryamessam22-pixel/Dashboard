import React from "react";
import "./ProjectRow.css";
import { Edit2, Trash2 } from "lucide-react";

const ProjectRow = ({ img, title, date, category, status, views, published }) => {
  return (
    <div className="project-row">

      {/* IMAGE + TEXT */}
      <div className="project-info">
        <img src={img} className="project-img" alt={title} />
        <div>
          <h4 className="project-title">{title}</h4>
          <p className="project-date">{date}</p>
        </div>
      </div>

      {/* CATEGORY */}
      <span className="project-badge category">{category}</span>

      {/* STATUS */}
      <span className={`project-badge status ${status.toLowerCase()}`}>
        {status}
      </span>

      {/* VIEWS */}
      <span className="project-views">{views}</span>

      {/* PUBLISH DATE */}
      <span className="project-publish">{published}</span>

      {/* ACTIONS */}
      <div className="project-actions">
        <Edit2 className="project-icon" />
        <Trash2 className="project-icon delete-icon" />
      </div>

    </div>
  );
};

export default ProjectRow;

