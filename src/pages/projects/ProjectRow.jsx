import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import './Projects.css';

const ProjectRow = ({ id, img, title, date, category, status, views, published, onDelete }) => {
    return (
        <div className="project-row">
            <div className="row-info">
                <img
                    src={img || "https://placehold.co/48x48"}
                    alt={title}
                    className="row-img"
                />
                <div className="row-text-content">
                    <h4 className="row-title" title={title}>{title}</h4>
                </div>
            </div>

            <div className="category-cell">
                <span className="badge category-badge">
                    {category || 'Uncategorized'}
                </span>
            </div>

            <div className="status-cell">
                <span className={`badge status-badge ${status?.toLowerCase() || 'draft'}`}>
                    {status || 'Draft'}
                </span>
            </div>

            <div className="views-cell">
                <span className="views-text">{views || 0} Views</span>
            </div>

            <div className="date-cell">
                <span className="date-text">{date}</span>
            </div>

            <div className="row-actions">
                <Link to={`/edit/${id}`} className="action-btn edit-btn" title="Edit">
                    <FiEdit2 size={16} />
                </Link>
                <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete(id)}
                    title="Delete"
                >
                    <FiTrash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default ProjectRow;
