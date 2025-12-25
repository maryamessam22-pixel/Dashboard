import React, { useMemo } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

const RichTextEditor = ({ value, onChange, placeholder }) => {

  const modules = useMemo(() => ({
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'clean']
    ],
  }), []);

  const handleChange = (content, delta, source, editor) => {
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