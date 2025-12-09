import React, { Component } from 'react';
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
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'clean']
          ],
        }}
      />
    </div>
  );
};

export default RichTextEditor;
