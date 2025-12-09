import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

const RichTextEditor = ({ value, onChange, placeholder }) => {
  return (
    <div className="custom-editor">
      <ReactQuill
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        theme="snow"
        className="editor-input"
      />
    </div>
  );
};

export default RichTextEditor;
