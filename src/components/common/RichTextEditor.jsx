import React, { useMemo } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

const RichTextEditor = ({ value, onChange, placeholder }) => {
  // Memoize modules to prevent re-creation on every render
  const modules = useMemo(() => ({
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'clean']
    ],
  }), []);

  // Handle change safely: check source to prevent infinite loops
  const handleChange = (content, delta, source, editor) => {
    // We only want to trigger the parent's onChange if the USER made the change.
    // This prevents loops where formatting normalization triggers an update,
    // which triggers a re-render, which triggers normalization, etc.
    if (source === 'user' && onChange) {
      onChange(content);
    }
  };

  return (
    <div className="custom-editor">
      <ReactQuill
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        theme="snow"
        className="editor-input"
        modules={modules}
      />
    </div>
  );
};

export default RichTextEditor;