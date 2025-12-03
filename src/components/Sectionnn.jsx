import React from "react";
import "./Sectionnn.css";
const Sectionnn = ({ title, children }) => {
  return (
    <div className="section-box">
      <h3 className="section-title">{title}</h3>
      {children}
    </div>
  );
};

export default Sectionnn;


