import React from "react";
import "./Exp.css";

import { FaEdit, FaTrash } from "react-icons/fa";

const ExpCard = ({ data, onEdit }) => {
  return (
    <div className="exp-card">
      <div className="exp-card-header">
        <h4>{data.companyEN}</h4>
        <button className="edit-btn" onClick={onEdit}>
          <FaEdit />
        </button>
      </div>

      <h5>{data.jobEN}</h5>

      <div dangerouslySetInnerHTML={{ __html: data.descriptionEN }} />
    </div>
  );
};

export default ExpCard;
