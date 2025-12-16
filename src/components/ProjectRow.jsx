import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import './ProjectRow.css';


const ProjectRow = ({ id, img, title, date, category, status, views, published }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${id}`); 
  };

  return (
    <div className="project-row">
   
      <div className="row-info">
        <img src={img} alt={title} className="row-img" />
        <div className="row-text">
          <h4 className="row-title">{title}</h4>
          <span className="row-subtitle">{date}</span>
        </div>
      </div>

        <div className="row-cell">
        <span className="badge category-badge">{category}</span>
      </div>

      
      <div className="row-cell">
        <span className={`badge status-badge ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

     
      <div className="row-cell views-text">{views}</div>

      
      <div className="row-cell date-text">{published}</div>

   
      <div className="row-actions">
        <button className="action-btn edit-btn" onClick={handleEdit}>
          <Edit2 size={16} /> Edit / تعديل
        </button>
        <button className="action-btn delete-btn">
          <Trash2 size={16} /> Delete / حذف
        </button>
      </div>
    </div>
  );
};

export default ProjectRow;


