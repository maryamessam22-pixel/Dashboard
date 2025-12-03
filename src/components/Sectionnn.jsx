import React from "react";
import "./Sectionnn.css";

const Sectionnn = (props) => {
  return (
    <div className="section-box">
      <h2 className="section-title">{props.title}</h2>

      <div className="section-content">
        {props.children}
      </div>
    </div>
  );
};

export default Sectionnn;

