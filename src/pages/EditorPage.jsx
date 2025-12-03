import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './EditorPage.css';


const EditorPage = () => {
  const { id } = useParams();
  const [contentEN, setContentEN] = useState("");
  const [contentAR, setContentAR] = useState("");

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2>Project Editor (EN) / محرر المشروع (EN)</h2>
      <ReactQuill theme="snow" value={contentEN} onChange={setContentEN} />

      <h2 style={{ marginTop: "30px" }}>Project Editor (AR) / محرر المشروع (AR)</h2>
      <ReactQuill theme="snow" value={contentAR} onChange={setContentAR} />

      <button style={{ marginTop: "20px", padding: "10px 20px" }}>
        Save / حفظ
      </button>
    </div>
  );
};

export default EditorPage;
