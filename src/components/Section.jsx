import React from "react";
import "./Section.css";

const Section = (props) => {
  return (
    <div className="section-box">
      <h2 className="section-title">{props.title}</h2>

      <div className="section-content">
        {props.children}
      </div>
    </div>
  );
};

export default Section;
