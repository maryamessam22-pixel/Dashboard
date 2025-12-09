import React, { useState } from "react";
import RichTextEditor from "../common/RichTextEditor";
import "./Skills.css";


const SkillsForm = ({ data, onSave }) => {
  const [titleEN, setTitleEN] = useState(data.titleEN);
  const [titleAR, setTitleAR] = useState(data.titleAR);
  const [subtitleEN, setSubtitleEN] = useState(data.subtitleEN);
  const [subtitleAR, setSubtitleAR] = useState(data.subtitleAR);

  const [descEN, setDescEN] = useState(data.descriptionEN);
  const [descAR, setDescAR] = useState(data.descriptionAR);

  return (
    <div className="form-wrapper">
      <h3>Edit Skills</h3>

      <input value={titleEN} onChange={(e) => setTitleEN(e.target.value)} placeholder="Title (EN)" />
      <input value={titleAR} onChange={(e) => setTitleAR(e.target.value)} placeholder="العنوان (AR)" />

      <input value={subtitleEN} onChange={(e) => setSubtitleEN(e.target.value)} placeholder="Subtitle (EN)" />
      <input value={subtitleAR} onChange={(e) => setSubtitleAR(e.target.value)} placeholder="العنوان الفرعي (AR)" />

      <RichTextEditor value={descEN} onChange={setDescEN} />
      <RichTextEditor value={descAR} onChange={setDescAR} />

      <button
        className="save-btn"
        onClick={() =>
          onSave({
            titleEN,
            titleAR,
            subtitleEN,
            subtitleAR,
            descriptionEN: descEN,
            descriptionAR: descAR,
          })
        }
      >
        Save
      </button>
    </div>
  );
};

export default SkillsForm;

